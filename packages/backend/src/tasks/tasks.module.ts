import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { TaskSetController } from './taskset.controller';
import { TaskSetService } from './taskset.service';

@Module({
  imports: [PrismaModule],
  controllers: [TasksController, TaskSetController],
  providers: [TasksService, TaskSetService],
  exports: [TasksService]
})
export class TasksModule {}
