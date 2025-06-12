import { ApiProperty } from '@nestjs/swagger';
import { DownloadRequest, DownloadStatus } from '@prisma/client';

export class DownloadEntity implements DownloadRequest {
  @ApiProperty({ description: 'Unique ID of the download' })
  id: string;

  @ApiProperty({ description: 'The status of the download', enum: DownloadStatus })
  status: DownloadStatus;

  @ApiProperty({ description: 'Where the download is located in the download bucket' })
  location: string;

  @ApiProperty({ description: 'When the download request was made' })
  createdAt: Date;
}
