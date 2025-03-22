import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin, of, switchMap, tap } from 'rxjs';

export interface IUserAssessmentTest {
  _id: string;
  assessmentTestId: string;
  userId: string;
  score: number;
  completed: boolean;
  subject: string;
  userAnswers: string[];
  lastUpdated: string;
}
export interface IAssessmentTest {
  _id: string;
  name: string;
  subject: string;
  lastUpdated: string;
  testQuestions: ITestQuestion[];
}

export interface ITestQuestion {
  question: string;
  choices: { value: string }[];
  answer: string;
  correctResponse: string;
  incorrectResponse: string;
}

@Injectable({
  providedIn: 'root',
})
export class AssessmentTestService {
  httpClient = inject(HttpClient);

  assessmentTest = new BehaviorSubject<IAssessmentTest | null>(null);
  assessmentTest$ = this.assessmentTest.asObservable();

  userAssessmentTest = new BehaviorSubject<IUserAssessmentTest | null>(null);
  userAssessmentTest$ = this.userAssessmentTest.asObservable();

  fetchAssessmentTest(id: string) {
    return this.httpClient
      .get<IAssessmentTest>(`/api/assessment-test/${id}`)
      .pipe(
        tap((data) => {
          this.assessmentTest.next(data);
        })
      );
  }

  startUserAssessmentTest(subject: string) {
    return this.httpClient
      .post<IUserAssessmentTest>('/api/assessment-test/start-test', { subject })
      .pipe(
        switchMap((userAssessmentTest) =>
          forkJoin([
            of(userAssessmentTest),
            this.fetchAssessmentTest(userAssessmentTest.assessmentTestId),
          ])
        ),
        tap(([test]) => {
          this.userAssessmentTest.next(test);
        })
      );
  }

  submitTest(answers: string[]) {
    return this.httpClient.post<IUserAssessmentTest>(
      '/api/assessment-test/submit-test',
      {
        testId: this.userAssessmentTest.value?._id,
        answers,
      }
    );
  }

  fetchUserSubjectsEligibility(subjects: string[]) {
    return this.httpClient.get<string[]>(
      `/api/assessment-test/user-subjects-eligibility?subjects=${subjects.join(
        ','
      )}`
    );
  }
}
