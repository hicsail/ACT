import { Injectable, Inject } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import * as events from './events';
import { S3_PROVIDER } from 'src/s3/s3.provider';
import { paginateListObjectsV2, S3Client } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';
import { DownloadRequest } from '@prisma/client';

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
      await this.download();
    } catch(e) {
      console.error(e);
      this.eventEmitter.emit(events.DOWNLOAD_REQUEST_FAILED, payload);
    }
  }

  private async download() {
    const objects = await this.generateListOfFiles();
    console.log(objects);
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
