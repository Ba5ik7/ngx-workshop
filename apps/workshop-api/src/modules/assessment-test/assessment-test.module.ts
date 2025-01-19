import { Module } from '@nestjs/common';
import { AssessmentTestController } from './assessment-test.controller';

@Module({
  controllers: [AssessmentTestController],
})
export class AssessmentTestModule {}
