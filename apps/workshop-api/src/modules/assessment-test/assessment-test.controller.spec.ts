import { Test, TestingModule } from '@nestjs/testing';
import { AssessmentTestController } from './assessment-test.controller';

describe('AssessmentTestController', () => {
  let controller: AssessmentTestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AssessmentTestController],
    }).compile();

    controller = module.get<AssessmentTestController>(AssessmentTestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
