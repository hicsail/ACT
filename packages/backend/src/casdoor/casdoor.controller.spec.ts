import { Test, TestingModule } from '@nestjs/testing';
import { CasdoorController } from './casdoor.controller';

describe('CasdoorController', () => {
  let controller: CasdoorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CasdoorController],
    }).compile();

    controller = module.get<CasdoorController>(CasdoorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
