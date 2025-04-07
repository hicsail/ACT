import { Module } from '@nestjs/common';
import { TaskCompletionsService } from './taskcompletions.service';
import { TaskCompletionsController } from './taskcompletions.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [TaskCompletionsController],
  providers: [TaskCompletionsService],
})
export class TaskCompletionsModule {}
