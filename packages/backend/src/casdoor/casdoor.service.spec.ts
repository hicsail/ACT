import { Test, TestingModule } from '@nestjs/testing';
import { CasdoorService } from './casdoor.service';

describe('CasdoorService', () => {
  let service: CasdoorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CasdoorService]
    }).compile();

    service = module.get<CasdoorService>(CasdoorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
