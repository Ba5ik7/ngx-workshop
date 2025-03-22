import { Component, inject, signal } from '@angular/core';
import { TestSelectionComponent } from './test-selection/test-selection.component';
import { AssessmentTestService } from '../../shared/services/assessment-test/assessment-test.service';
import { AsyncPipe } from '@angular/common';
import { TestQuestionComponent } from './test-question/test-question.component';
import { BehaviorSubject, combineLatest, lastValueFrom, map, tap } from 'rxjs';

@Component({
  selector: 'app-assessment-test',
  host: { class: 'main-content' },
  imports: [TestSelectionComponent, TestQuestionComponent, AsyncPipe],
  template: `
    <div class="container">
      @if(beginTest()) {
      <ngx-test-question
        [question]="(currentQuestion$ | async)!"
        (submittedAnswer)="submitAnswer($event)"
      ></ngx-test-question>
      } @else {
      <ngx-test-selection
        [subjectEligibility]="(subjectEligibility$ | async)!"
        (startTest)="startTest($event)"
      ></ngx-test-selection>
      }
    </div>
  `,
  styles: [
    `
      :host {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        .container {
          border-radius: 24px;
          padding: 36px;
          background-color: var(--mat-sys-secondary-container);
          color: var(--mat-sys-on-secondary-container);
          // box-shadow: var(--mat-sys-level5);
        }
      }
    `,
  ],
})
export class AssessmentTestComponent {
  assessmentTestService = inject(AssessmentTestService);
  beginTest = signal(false);

  testLength = 0;
  currentIndex = new BehaviorSubject(0);
  answers: string[] = [];

  subjectEligibility$ = this.assessmentTestService.fetchUserSubjectsEligibility(
    ['ANGULAR', 'NESTJS', 'RXJS']
  );

  currentQuestion$ = combineLatest([
    this.currentIndex,
    this.assessmentTestService.assessmentTest$,
  ]).pipe(
    map(([currentIndex, test]) => ({
      currentIndex,
      testQuestions: test ? test.testQuestions : [],
    })),
    tap(({ testQuestions }) => (this.testLength = testQuestions.length)),
    map(({ currentIndex, testQuestions }) => testQuestions[currentIndex])
  );

  startTest(subject: string) {
    this.beginTest.set(true);
    lastValueFrom(this.assessmentTestService.startUserAssessmentTest(subject));
  }

  submitAnswer(answer: string) {
    if (this.answers.push(answer) >= this.testLength) {
      lastValueFrom(
        this.assessmentTestService.submitTest(this.answers).pipe(
          tap(() => {
            this.beginTest.set(false);
            this.currentIndex.next(0);
            this.answers = [];
          })
        )
      );
    } else {
      this.currentIndex.next(this.currentIndex.value + 1);
    }
  }
}
