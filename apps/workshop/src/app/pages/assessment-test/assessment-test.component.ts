import { Component, inject, signal } from '@angular/core';
import { TestSelectionComponent } from './test-selection/test-selection.component';
import { AssessmentTestService } from '../../shared/services/assessment-test/assessment-test.service';
import { AsyncPipe } from '@angular/common';
import { TestQuestionComponent } from './test-question/test-question.component';
import { BehaviorSubject, combineLatest, map } from 'rxjs';

@Component({
  selector: 'app-assessment-test',
  host: { class: 'main-content' },
  imports: [TestSelectionComponent, TestQuestionComponent, AsyncPipe],
  template: `
    <div class="container">
      @if(beginTest()) {
      <ngx-test-question
        [question]="currentQuestion$ | async"
        (answer)="answerQuestion()"
      ></ngx-test-question>
      } @else {
      <ngx-test-selection
        (startTest)="beginTest.set(true)"
      ></ngx-test-selection>
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

  currentIndex = new BehaviorSubject(0);

  currentQuestion$ = combineLatest([
    this.currentIndex,
    this.assessmentTestService.assessmentTest$.pipe(
      map((test) => test[0].testQuestions)
    ),
  ]).pipe(map(([currentIndex, testQuestions]) => testQuestions[currentIndex]));

  answerQuestion() {
    this.currentIndex.next(this.currentIndex.value + 1);
    // this.assessmentTestService.answerQuestion();
  }
}
