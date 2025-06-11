import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DownloadRequest, DownloadStatus } from '@prisma/client';
import { PaginationDTO } from 'src/pagination/pagination.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DownloadsService {
  private readonly downloadLocation: string;

  constructor(
    private readonly prismaService: PrismaService,
    configService: ConfigService
  ) {
    this.downloadLocation = configService.getOrThrow<string>('s3.downloadZipsFolder');
  }

  async create(): Promise<DownloadRequest> {
    const createdAt = new Date();
    return this.prismaService.downloadRequest.create({
      data: {
        createdAt,
        status: DownloadStatus.STARTING,
        location: this.getLocationString(createdAt)
      }
    })
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
    return `${this.downloadLocation}/download_${date.getFullYear()}_${date.toISOString()}.zip`
  }
}
