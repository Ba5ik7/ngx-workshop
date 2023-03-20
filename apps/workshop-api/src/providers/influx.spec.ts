import { Test, TestingModule } from '@nestjs/testing';
import { Influx } from './influx';

describe('Influx', () => {
  let provider: Influx;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Influx],
    }).compile();

    provider = module.get<Influx>(Influx);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
