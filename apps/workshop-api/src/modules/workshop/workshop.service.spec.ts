import { Test, TestingModule } from '@nestjs/testing';
import { WorkshopService } from './workshop.service';

describe('WorkshopService', () => {
  let service: WorkshopService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WorkshopService],
    }).compile();

    service = module.get<WorkshopService>(WorkshopService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
