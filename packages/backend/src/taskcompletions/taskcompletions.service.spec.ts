import { Test, TestingModule } from '@nestjs/testing';
import { TaskcompletionsService } from './taskcompletions.service';

describe('TaskcompletionsService', () => {
  let service: TaskcompletionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaskcompletionsService]
    }).compile();

    service = module.get<TaskcompletionsService>(TaskcompletionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
