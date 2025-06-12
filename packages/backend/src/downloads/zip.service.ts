import { Injectable, Inject } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import * as events from './events';
import { S3_PROVIDER } from '../s3/s3.provider';
import { paginateListObjectsV2, S3Client, GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';
import { DownloadRequest } from '@prisma/client';
import * as archiver from 'archiver';
import { createReadStream, createWriteStream } from 'fs';
import { FileResultNoFd, fileSync } from 'tmp';
import { basename } from 'path';

@Injectable()
export class Zipper {
  private readonly bucket: string;
  private readonly downloadsFolder: string;

  constructor(
    @Inject(S3_PROVIDER) private readonly s3: S3Client,
    configService: ConfigService,
    private readonly eventEmitter: EventEmitter2
  ) {
    this.bucket = configService.getOrThrow<string>('s3.bucket');
    this.downloadsFolder = configService.getOrThrow<string>('s3.downloadZipsFolder');
  }

  @OnEvent(events.DOWNLOAD_REQUEST_CREATED)
  async handleDownload(payload: DownloadRequest) {
    try {
      // Make the zip
      const file = await this.download();

      // Upload the zip
      await this.uploadZip(payload, file)

      // Mark the download process as complete
      this.eventEmitter.emit(events.DOWNLOAD_SUCCESS, payload);
    } catch(e) {
      console.error(e);
      this.eventEmitter.emit(events.DOWNLOAD_REQUEST_FAILED, payload);
    }
  }

  private async uploadZip(downloadRequest: DownloadRequest, file: FileResultNoFd): Promise<void> {
    // Make the read stream
    const stream = createReadStream(file.name);

    await new Promise<string>((resolve, reject) => {
      stream.on('ready', () => {
        resolve('Success');
      });
      stream.on('error', () => {
        reject();
      })
    });

    // Make the put command
    const putCmd = new PutObjectCommand({
      Bucket: this.bucket,
      Key: downloadRequest.location,
      Body: stream,
      ContentType: 'application/zip',
    });

    await this.s3.send(putCmd);
  }

  private async download(): Promise<FileResultNoFd> {
    // Get the objects to zip
    const objects = await this.generateListOfFiles();

    // Get a temporary file to store the zip
    const tmpFile = fileSync({ discardDescriptor: true });

    // Make a file stream into the temp file
    const fileStream = createWriteStream(tmpFile.name);

    // Make the streaming archive
    const archive = archiver.create('zip');
    archive.pipe(fileStream);
    archive.on('error', err => {
      throw err;
    });

    // Loop over the objects
    for (const key of objects) {
      // Download the file
      const command = new GetObjectCommand({ Bucket: this.bucket, Key: key });
      const response = await this.s3.send(command);
      const file = response.Body;
      if (!file) {
        continue;
      }

      // Make a buffer of the file
      const buffer = Buffer.from(await file.transformToByteArray());

      // Use only the base name in the zip
      const entryName = basename(key);

      // Add the file to the archive
      archive.append(buffer, { name: entryName });
    }

    // Wait for the archive process to finalize
    await archive.finalize();

    fileStream.close();

    // Return the location of the zipped file
    return tmpFile;
  }

  private async generateListOfFiles(): Promise<string[]> {
    const paginator = paginateListObjectsV2(
      { client: this.s3, pageSize: 100 },
      { Bucket: this.bucket }
    );

    const objects: string[] = [];

    for await (const page of paginator) {
      if (!page.Contents) {
        continue;
      }
      for (const object of page.Contents) {
        // Get the key
        const key = object.Key;
        if (!key) {
          continue;
        }

        // Make sure it doesn't start with the download prefix
        if (key.startsWith(this.downloadsFolder)) {
          continue;
        }

        // Otherwise add it to the list of objects
        objects.push(key);
      }
    }

    return objects;
  }
}
