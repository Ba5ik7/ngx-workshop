import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Observable } from 'rxjs';
import { AssessmentTestService } from '../services/assessment-test/assessment-test.service';

type AssessmentTestResolver = ResolveFn<Observable<unknown>>;
export const assessmentTestResolver: AssessmentTestResolver = () => {
  return inject(AssessmentTestService).fetchAssessmentTest();
};
