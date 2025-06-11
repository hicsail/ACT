import { Controller, Get, Post, Param, Delete, UseGuards, Query, Response, NotFoundException } from '@nestjs/common';
import { DownloadsService } from './downloads.service';
import { DownloadEntity } from './entities/download.entity';
import { ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { CasdoorGuard } from '../casdoor/casdoor.guard';
import { AdminGuard } from '../casdoor/admin.guard';
import { PaginationDTO, makeContentRange } from 'src/pagination/pagination.dto';
import { Response as Res } from 'express';

@Controller('downloads')
@ApiBearerAuth()
@UseGuards(CasdoorGuard, AdminGuard)
export class DownloadsController {
  constructor(private readonly downloadsService: DownloadsService) {}

  @Post()
  @ApiResponse({ type: DownloadEntity })
  async create(): Promise<DownloadEntity> {
    return this.downloadsService.create();
  }

  @Get()
  @ApiResponse({ type: [DownloadEntity] })
  async findAll(@Query() pagination: PaginationDTO, @Response() res: Res): Promise<any> {
    const result = await this.downloadsService.findAll(pagination);

    // Determine content-range header
    const total = await this.downloadsService.count();
    res.setHeader('Content-Range', makeContentRange('tasks', pagination, total));

    return res.json(result);
  }

  @Get(':id')
  @ApiResponse({ type: DownloadEntity })
  async findOne(@Param('id') id: string): Promise<DownloadEntity> {
    const found = await this.downloadsService.findOne(id);
    if (!found) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
    return found;
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.downloadsService.remove(id);
  }
}
