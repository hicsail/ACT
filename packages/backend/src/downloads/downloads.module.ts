import { Module } from '@nestjs/common';
import { DownloadsService } from './downloads.service';
import { DownloadsController } from './downloads.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { CasdoorModule } from '../casdoor/casdoor.module';
import { S3Module } from '../s3/s3.module';
import { Zipper } from './zip.service';

@Module({
  imports: [PrismaModule, CasdoorModule, S3Module],
  controllers: [DownloadsController],
  providers: [DownloadsService, Zipper],
})
export class DownloadsModule {}
