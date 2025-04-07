import { Test, TestingModule } from '@nestjs/testing';
import { TaskcompletionsController } from './taskcompletions.controller';
import { TaskcompletionsService } from './taskcompletions.service';

describe('TaskcompletionsController', () => {
  let controller: TaskcompletionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskcompletionsController],
      providers: [TaskcompletionsService],
    }).compile();

    controller = module.get<TaskcompletionsController>(
      TaskcompletionsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
