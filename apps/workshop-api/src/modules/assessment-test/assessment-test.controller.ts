import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { Auth } from '../../decorators/auth.decorator';
import { AuthType } from '../../enums/auth-type.enum';
import { AssessmentTestService } from './assessment-test.service';
import { TAssessmentTest } from './schemas/assessment-test.schemas';

@Controller('assessment-test')
export class AssessmentTestController {
  constructor(private assessmentTestService: AssessmentTestService) {}

  @Auth(AuthType.None)
  @Post()
  create(@Body() assessmentTest: TAssessmentTest): Promise<TAssessmentTest> {
    return this.assessmentTestService.create(assessmentTest);
  }

  @Auth(AuthType.None)
  @Get()
  fetch() {
    return this.assessmentTestService.fetch();
  }

  @Auth(AuthType.None)
  @Post()
  update(@Body() assessmentTest: TAssessmentTest): Promise<TAssessmentTest> {
    return this.assessmentTestService.update(assessmentTest);
  }

  @Auth(AuthType.None)
  @Delete()
  delete(@Body() id: string) {
    return this.assessmentTestService.delete(id);
  }
}
