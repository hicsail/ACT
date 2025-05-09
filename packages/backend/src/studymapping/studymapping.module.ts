import { Module } from '@nestjs/common';
import { StudymappingService } from './studymapping.service';
import { StudymappingController } from './studymapping.controller';
import { CasdoorModule } from '../casdoor/casdoor.module';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [CasdoorModule, PrismaModule],
  providers: [StudymappingService],
  controllers: [StudymappingController]
})
export class StudymappingModule {}
