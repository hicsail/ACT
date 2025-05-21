import { Body, Controller, Post, Query, Response, Get, UseInterceptors, UploadedFile, UseGuards } from '@nestjs/common';
import { WebhookPayload } from './dto/webhook.dto';
import { StudymappingService } from './studymapping.service';
import { ApiBody, ApiResponse, ApiConsumes, ApiBearerAuth } from '@nestjs/swagger';
import { StudyMappingEntity } from './entities/studymapping.entity';
import { PaginationDTO, makeContentRange } from '../pagination/pagination.dto';
import { Response as Res } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { CasdoorGuard } from '../casdoor/casdoor.guard';
import { AdminGuard } from 'src/casdoor/admin.guard';

@Controller('studymapping')
@ApiBearerAuth()
@UseGuards(CasdoorGuard)
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

  @Post('upload')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary'
        }
      }
    }
  })
  @UseGuards(AdminGuard)
  async uploadCSV(@UploadedFile('file') file: Express.Multer.File): Promise<void> {
    console.log(file);
    await this.studyMappingService.handleCSV(file);
  }
}
