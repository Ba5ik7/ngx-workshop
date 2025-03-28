import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { AssessmentTestService } from './assessment-test.service';
import { TAssessmentTest } from './schemas/assessment-test.schemas';
import { ActiveUser } from '../../decorators/active-user.decorator';
import { IActiveUserData } from '../../interfaces/active-user-data.interface';

@Controller('assessment-test')
export class AssessmentTestController {
  constructor(private assessmentTestService: AssessmentTestService) {}

  @Post()
  create(@Body() assessmentTest: TAssessmentTest) {
    return this.assessmentTestService.create(assessmentTest);
  }

  @Get()
  fetch() {
    return this.assessmentTestService.fetch();
  }

  @Post()
  update(@Body() assessmentTest: TAssessmentTest) {
    return this.assessmentTestService.update(assessmentTest);
  }

  @Delete()
  delete(@Body() id: string) {
    return this.assessmentTestService.delete(id);
  }

  @Get('user-asssessments')
  fetchUsersAssessments(
    @ActiveUser() user: IActiveUserData,
  ) {
    return this.assessmentTestService.fetchUsersAssessments(
      user.sub
    );
  }

  @Get('user-subjects-eligibility')
  fetchUserSubjectsEligibility(
    @ActiveUser() user: IActiveUserData,
    @Query('subjects') subjects: string
  ) {
    const subjectArray = subjects.split(',');
    return this.assessmentTestService.fetchUserSubjectsEligibility(
      user.sub,
      subjectArray
    );
  }

  @Post('start-test')
  startTest(
    @ActiveUser() user: IActiveUserData,
    @Body() reqBody: { subject: string }
  ) {
    return this.assessmentTestService.startTest(reqBody.subject, user.sub);
  }

  @Post('submit-test')
  submitTest(@Body() reqBody: { testId: string; answers: string[] }) {
    return this.assessmentTestService.submitTest(
      reqBody.testId,
      reqBody.answers
    );
  }

  @Get(':id')
  fetchAssessmentTest(@Param('id') id: string) {
    return this.assessmentTestService.fetchAssessmentTest(id);
  }
}
