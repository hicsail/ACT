import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { DownloadRequest, DownloadStatus } from '@prisma/client';
import { PaginationDTO } from '../pagination/pagination.dto';
import { PrismaService } from '../prisma/prisma.service';
import * as events from './events';
import { S3_PROVIDER } from 'src/s3/s3.provider';
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

@Injectable()
export class DownloadsService {
  private readonly downloadLocation: string;
  private readonly bucket: string;
  private readonly expiration: number;

  constructor(
    private readonly prismaService: PrismaService,
    configService: ConfigService,
    private readonly eventEmitter: EventEmitter2,
    @Inject(S3_PROVIDER) private readonly s3: S3Client
  ) {
    this.downloadLocation = configService.getOrThrow<string>('s3.downloadZipsFolder');
    this.bucket = configService.getOrThrow<string>('s3.bucket');
    this.expiration = configService.getOrThrow<number>('s3.signedExpiration');
  }

  async create(): Promise<DownloadRequest> {
    // Make the request
    const createdAt = new Date();
    const request = await this.prismaService.downloadRequest.create({
      data: {
        createdAt,
        status: DownloadStatus.IN_PROGRESS,
        location: this.getLocationString(createdAt)
      }
    });

    // Trigger the download progress
    this.eventEmitter.emit(events.DOWNLOAD_REQUEST_CREATED, request);

    return request;
  }

  findAll(pagination: PaginationDTO): Promise<DownloadRequest[]> {
    return this.prismaService.downloadRequest.findMany({
      where: pagination.filter,
      take: pagination.range ? pagination.range.end - pagination.range.start : undefined,
      skip: pagination.range ? pagination.range.start : undefined,
      orderBy: pagination.sort ? { [pagination.sort.field]: pagination.sort.direction } : undefined
    });
  }

  async findOne(id: string): Promise<DownloadRequest | null> {
    return this.prismaService.downloadRequest.findUnique({
      where: { id }
    });
  }

  async remove(id: string): Promise<void> {
    // TODO: Remove the ZIP in the bucket
    await this.prismaService.downloadRequest.delete({
      where: { id }
    });
  }

  async count(): Promise<number> {
    return this.prismaService.downloadRequest.count();
  }

  private getLocationString(date: Date): string {
    return `${this.downloadLocation}/download_${date.toISOString()}.zip`;
  }

  async getDownloadURL(location: string): Promise<string> {
    const request = new GetObjectCommand({ Bucket: this.bucket, Key: location });
    return getSignedUrl(this.s3, request, { expiresIn: this.expiration });
  }

  @OnEvent(events.DOWNLOAD_SUCCESS)
  async markSuccess(payload: DownloadRequest) {
    await this.prismaService.downloadRequest.update({
      where: { id: payload.id },
      data: { status: DownloadStatus.COMPLETE }
    });
  }

  @OnEvent(events.DOWNLOAD_REQUEST_FAILED)
  async markFailed(payload: DownloadRequest) {
    console.log(payload);
    await this.prismaService.downloadRequest.update({
      where: { id: payload.id },
      data: { status: DownloadStatus.FAILED }
    });
  }
}
