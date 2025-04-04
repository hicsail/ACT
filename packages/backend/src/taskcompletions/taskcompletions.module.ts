import { Module } from '@nestjs/common';
import { TaskCompletionsService } from './taskcompletions.service';
import { TaskCompletionsController } from './taskcompletions.controller';

@Module({
  controllers: [TaskCompletionsController],
  providers: [TaskCompletionsService],
})
export class TaskCompletionsModule {}
