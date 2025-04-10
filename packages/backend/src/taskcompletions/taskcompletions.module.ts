import { Module } from '@nestjs/common';
import { TaskCompletionsService } from './taskcompletions.service';
import { TaskCompletionsController } from './taskcompletions.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { TasksModule } from '../tasks/tasks.module';
import { CasdoorModule } from '../casdoor/casdoor.module';
import { S3Module } from '../s3/s3.module';

@Module({
  imports: [PrismaModule, TasksModule, CasdoorModule, S3Module],
  controllers: [TaskCompletionsController],
  providers: [TaskCompletionsService]
})
export class TaskCompletionsModule {}
