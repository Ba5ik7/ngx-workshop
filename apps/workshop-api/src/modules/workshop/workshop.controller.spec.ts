import { Test, TestingModule } from '@nestjs/testing';
import { WorkshopController } from './workshop.controller';

describe('WorkshopController', () => {
  let controller: WorkshopController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WorkshopController],
    }).compile();

    controller = module.get<WorkshopController>(WorkshopController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
