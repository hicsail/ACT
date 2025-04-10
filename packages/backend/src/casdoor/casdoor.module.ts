import { Module } from '@nestjs/common';
import { CasdoorController } from './casdoor.controller';
import { casdoorProvider } from './casdoor.provider';
import { CasdoorService } from './casdoor.service';
import { CasdoorGuard } from './casdoor.guard';

@Module({
  controllers: [CasdoorController],
  providers: [casdoorProvider, CasdoorService, CasdoorGuard],
  exports: [CasdoorGuard, CasdoorService]
})
export class CasdoorModule {}
