import { Body, Controller, Post } from '@nestjs/common';
import { WebhookPayload } from './dto/webhook.dto';
import { StudymappingService } from './studymapping.service';

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
    await
  }
}
