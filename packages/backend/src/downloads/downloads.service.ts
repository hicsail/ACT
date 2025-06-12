import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { DownloadRequest, DownloadStatus } from '@prisma/client';
import { PaginationDTO } from '../pagination/pagination.dto';
import { PrismaService } from '../prisma/prisma.service';
import * as events from './events';

@Injectable()
export class DownloadsService {
  private readonly downloadLocation: string;

  constructor(
    private readonly prismaService: PrismaService,
    configService: ConfigService,
    private readonly eventEmitter: EventEmitter2,
  ) {
    this.downloadLocation = configService.getOrThrow<string>('s3.downloadZipsFolder');
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
    return `${this.downloadLocation}/download_${date.toISOString()}.zip`
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
