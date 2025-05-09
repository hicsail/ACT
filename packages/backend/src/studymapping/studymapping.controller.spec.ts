import { Test, TestingModule } from '@nestjs/testing';
import { StudymappingController } from './studymapping.controller';

describe('StudymappingController', () => {
  let controller: StudymappingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudymappingController]
    }).compile();

    controller = module.get<StudymappingController>(StudymappingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
