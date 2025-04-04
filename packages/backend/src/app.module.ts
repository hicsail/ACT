import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CasdoorModule } from './casdoor/casdoor.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { TasksModule } from './tasks/tasks.module';
import { PaginationModule } from './pagination/pagination.module';
import { TaskCompletionsModule } from './taskcompletions/taskcompletions.module';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    CasdoorModule,
    PrismaModule,
    TasksModule,
    PaginationModule,
    TaskCompletionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
