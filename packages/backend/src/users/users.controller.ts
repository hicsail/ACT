import { Controller, Get, Param, Query, Response, UseGuards, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { Response as Res } from 'express';
import { PaginationDTO, makeContentRange } from 'src/pagination/pagination.dto';
import { ApiBearerAuth, ApiProperty, ApiResponse } from '@nestjs/swagger';
import { AdminGuard } from '../casdoor/admin.guard';
import { CasdoorGuard } from '../casdoor/casdoor.guard';

class HasComplete {
  @ApiProperty()
  complete: boolean;
}

@Controller('users')
@ApiBearerAuth()
@UseGuards(CasdoorGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(AdminGuard)
  async findAll(@Query() pagination: PaginationDTO, @Response() res: Res) {
    // Determine content-range header
    const total = await this.usersService.count();
    res.setHeader('Content-Range', makeContentRange('tasks', pagination, total));

    return res.json(await this.usersService.findAll(pagination));
  }

  @Get(':id')
  @UseGuards(AdminGuard)
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Get('/training-complete/:id')
  @ApiResponse({ type: HasComplete })
  async isTrainingComplete(@Param('id') id: string): Promise<{ complete: boolean }> {
    return {
      complete: await this.usersService.isTrainingComplete(id)
    };
  }

  @Put('/training-complete/:id')
  async markTrainingComplete(@Param('id') id: string): Promise<void> {
    await this.usersService.markTrainingComplete(id);
  }
}
