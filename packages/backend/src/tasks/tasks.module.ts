import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { TaskSetController } from './taskset.controller';
import { TaskSetService } from './taskset.service';
import { CasdoorModule } from '../casdoor/casdoor.module';

@Module({
  imports: [PrismaModule, CasdoorModule],
  controllers: [TasksController, TaskSetController],
  providers: [TasksService, TaskSetService],
  exports: [TasksService]
})
export class TasksModule {}
