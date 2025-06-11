import { Module } from '@nestjs/common';
import { DownloadsService } from './downloads.service';
import { DownloadsController } from './downloads.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { CasdoorModule } from '../casdoor/casdoor.module';

@Module({
  imports: [PrismaModule, CasdoorModule],
  controllers: [DownloadsController],
  providers: [DownloadsService],
})
export class DownloadsModule {}
