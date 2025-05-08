import { Body, Controller, Post, Query, Response, Get } from '@nestjs/common';
import { WebhookPayload } from './dto/webhook.dto';
import { StudymappingService } from './studymapping.service';
import { ApiResponse } from '@nestjs/swagger';
import { StudyMappingEntity } from './entities/studymapping.entity';
import { PaginationDTO, makeContentRange } from 'src/pagination/pagination.dto';
import { Response as Res } from 'express';

@Controller('studymapping')
export class StudymappingController {
  constructor(private readonly studyMappingService: StudymappingService) {}

  @Post()
  async webhook(@Body() payload: WebhookPayload) {
    // Webhook is still triggered on errors, ignore them
    if (payload.response.includes('error')) {
      return;
    }

    // Otherwise, update the user object
    await this.studyMappingService.setStudyID(payload);
  }

  @Get()
  @ApiResponse({ type: StudyMappingEntity })
  async findAll(@Query() pagination: PaginationDTO, @Response() res: Res): Promise<any> {
    const result = await this.studyMappingService.findAll(pagination);

    // Determine content-range header
    const total = await this.studyMappingService.count();
    res.setHeader('Content-Range', makeContentRange('tasks', pagination, total));

    return res.json(result);
  }


}
