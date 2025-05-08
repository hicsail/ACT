import { Injectable } from '@nestjs/common';
import { CasdoorService } from '../casdoor/casdoor.service';
import { WebhookPayload } from './dto/webhook.dto';
import { PaginationDTO } from '../pagination/pagination.dto';
import { StudyMapping } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class StudymappingService {
  constructor(private readonly casdoorService: CasdoorService, private readonly prismaService: PrismaService) {}

  async setStudyID(payload: WebhookPayload): Promise<void> {
    const user = await this.casdoorService.findByEmail(payload.object.email);
    if (!user) {
      throw new Error(`User with email ${payload.object.email} not found`);
    }

    user.affiliation = 'test';
    await this.casdoorService.updateUser(user);
  }

  async findAll(pagination: PaginationDTO): Promise<StudyMapping[]> {
    return this.prismaService.studyMapping.findMany({
      where: pagination.filter,
      take: pagination.range ? pagination.range.end - pagination.range.start : undefined,
      skip: pagination.range ? pagination.range.start : undefined,
      orderBy: pagination.sort ? { [pagination.sort.field]: pagination.sort.direction } : undefined
    });
  }

  async count(): Promise<number> {
    return this.prismaService.studyMapping.count();
  }

}
