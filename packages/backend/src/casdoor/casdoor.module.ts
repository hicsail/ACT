import { Module } from '@nestjs/common';
import { CasdoorController } from './casdoor.controller';
import { casdoorProvider } from './casdoor.provider';
import { CasdoorService } from './casdoor.service';

@Module({
  controllers: [CasdoorController],
  providers: [casdoorProvider, CasdoorService],
})
export class CasdoorModule {}
