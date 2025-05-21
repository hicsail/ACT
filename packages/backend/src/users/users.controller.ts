import { Controller, Get, Param, Query, Response, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { Response as Res } from 'express';
import { PaginationDTO, makeContentRange } from 'src/pagination/pagination.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AdminGuard } from 'src/casdoor/admin.guard';

@Controller('users')
@ApiBearerAuth()
@UseGuards(AdminGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(@Query() pagination: PaginationDTO, @Response() res: Res) {
    // Determine content-range header
    const total = await this.usersService.count();
    console.log(total);
    res.setHeader('Content-Range', makeContentRange('tasks', pagination, total));

    return res.json(await this.usersService.findAll(pagination));
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }
}
