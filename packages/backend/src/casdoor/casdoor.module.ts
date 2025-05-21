import { Module } from '@nestjs/common';
import { CasdoorController } from './casdoor.controller';
import { casdoorProvider } from './casdoor.provider';
import { CasdoorService } from './casdoor.service';
import { CasdoorGuard } from './casdoor.guard';
import { AdminGuard } from './admin.guard';

@Module({
  controllers: [CasdoorController],
  providers: [casdoorProvider, CasdoorService, CasdoorGuard, AdminGuard],
  exports: [CasdoorGuard, CasdoorService, casdoorProvider, AdminGuard]
})
export class CasdoorModule {}
