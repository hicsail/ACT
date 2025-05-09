import { Test, TestingModule } from '@nestjs/testing';
import { StudymappingService } from './studymapping.service';

describe('StudymappingService', () => {
  let service: StudymappingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StudymappingService]
    }).compile();

    service = module.get<StudymappingService>(StudymappingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
