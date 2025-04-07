import { Module } from '@nestjs/common';
import { TaskCompletionsService } from './taskcompletions.service';
import { TaskCompletionsController } from './taskcompletions.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { TasksModule } from '../tasks/tasks.module';

@Module({
  imports: [PrismaModule, TasksModule],
  controllers: [TaskCompletionsController],
  providers: [TaskCompletionsService],
})
export class TaskCompletionsModule {}
