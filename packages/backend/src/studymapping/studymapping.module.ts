import { Module } from '@nestjs/common';
import { StudymappingService } from './studymapping.service';
import { StudymappingController } from './studymapping.controller';

@Module({
  providers: [StudymappingService],
  controllers: [StudymappingController]
})
export class StudymappingModule {}
