import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { Auth } from '../../decorators/auth.decorator';
import { AuthType } from '../../enums/auth-type.enum';
import { AssessmentTestService } from './assessment-test.service';
import { TAssessmentTest } from './schemas/assessment-test.schemas';
import { ActiveUser } from '../../decorators/active-user.decorator';
import { IActiveUserData } from '../../interfaces/active-user-data.interface';

@Controller('assessment-test')
export class AssessmentTestController {
  constructor(private assessmentTestService: AssessmentTestService) {}

  @Post()
  create(@Body() assessmentTest: TAssessmentTest): Promise<TAssessmentTest> {
    return this.assessmentTestService.create(assessmentTest);
  }

  @Get()
  fetch() {
    return this.assessmentTestService.fetch();
  }

  @Post()
  update(@Body() assessmentTest: TAssessmentTest): Promise<TAssessmentTest> {
    return this.assessmentTestService.update(assessmentTest);
  }

  @Delete()
  delete(@Body() id: string) {
    return this.assessmentTestService.delete(id);
  }

  @Post('start-test')
  startTest(
    @ActiveUser() user: IActiveUserData,
    @Body() reqBody: { subject: string }
  ) {
    return this.assessmentTestService.startTest(reqBody.subject, user.sub);
  }

  @Post('submit-test')
  submitTest(
    @ActiveUser() user: IActiveUserData,
    @Body() reqBody: { testId: string; answers: string[] }
  ) {
    return this.assessmentTestService.submitTest(
      reqBody.testId,
      reqBody.answers
    );
  }
}
