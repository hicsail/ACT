import { Inject, Injectable } from '@nestjs/common';
import { CasdoorService } from '../casdoor/casdoor.service';
import { WebhookPayload } from './dto/webhook.dto';

@Injectable()
export class StudymappingService {
  constructor(private readonly casdoorService: CasdoorService) {}

  async setStudyID(payload: WebhookPayload): Promise<void> {
    const user = await this.casdoorService.findByEmail(payload.object.email);
    if (!user) {
      throw new Error(`User with email ${payload.object.email} not found`);
    }

    user.affiliation = 'test';
    await this.casdoorService.updateUser(user);
  }

}
