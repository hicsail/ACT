import { Inject, Injectable } from '@nestjs/common';
import { CasdoorService } from 'src/casdoor/casdoor.service';

@Injectable()
export class StudymappingService {
  constructor(private readonly casdoorService: CasdoorService) {}

}
