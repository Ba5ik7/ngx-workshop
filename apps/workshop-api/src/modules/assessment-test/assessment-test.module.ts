import { Module } from '@nestjs/common';
import { AssessmentTestController } from './assessment-test.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  AssessmentTest,
  AssessmentTestSchema,
} from './schemas/assessment-test.schemas';
import { AssessmentTestService } from './assessment-test.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AssessmentTest.name, schema: AssessmentTestSchema },
    ]),
  ],
  controllers: [AssessmentTestController],
  providers: [AssessmentTestService],
})
export class AssessmentTestModule {}
