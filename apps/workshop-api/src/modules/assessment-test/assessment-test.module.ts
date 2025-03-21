import { Module } from '@nestjs/common';
import { AssessmentTestController } from './assessment-test.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  AssessmentTest,
  AssessmentTestSchema,
} from './schemas/assessment-test.schemas';
import { AssessmentTestService } from './assessment-test.service';
import { UserAssessmentTestService } from './user-assessment-test.service';
import {
  UserAssessmentTest,
  UserAssessmentTestSchema,
} from './schemas/user-assessment-test.schemas';
import { User, UserSchema } from '../iam/authentication/schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AssessmentTest.name, schema: AssessmentTestSchema },
      { name: UserAssessmentTest.name, schema: UserAssessmentTestSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [AssessmentTestController],
  providers: [AssessmentTestService, UserAssessmentTestService],
})
export class AssessmentTestModule {}
