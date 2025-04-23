import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { CasdoorModule } from '../casdoor/casdoor.module';

@Module({
  imports: [CasdoorModule],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
