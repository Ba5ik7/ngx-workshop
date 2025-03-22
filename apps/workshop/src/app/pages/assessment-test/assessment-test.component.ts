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
      <ngx-test-selection (startTest)="startTest()"></ngx-test-selection>
      }
    </div>
  `,
  styles: [
    `
      :host {
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        .container {
          max-width: 800px;
          max-height: 600px;
          overflow: auto;
          width: 100%;
          border-radius: 24px;
          padding: 24px;
          background-color: var(--mat-sys-secondary-container);
          color: var(--mat-sys-on-secondary-container);
          box-shadow: var(--mat-sys-level5);
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

  startTest() {
    this.beginTest.set(true);
    lastValueFrom(
      this.assessmentTestService.startUserAssessmentTest('ANGULAR')
    );
  }

  submitAnswer(answer: string) {
    if (this.answers.push(answer) >= this.testLength) {
      this.beginTest.set(false);
      lastValueFrom(
        this.assessmentTestService.submitTest(this.answers)
      );
    } else {
      this.currentIndex.next(this.currentIndex.value + 1);
    }
  }
}
