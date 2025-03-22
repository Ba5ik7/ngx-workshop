import { Component, input, linkedSignal, model, output, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { ITestQuestion } from '../../../shared/services/assessment-test/assessment-test.service';

@Component({
  selector: 'ngx-test-question',
  imports: [ReactiveFormsModule, MatButton, MatRadioModule, FormsModule],
  template: `
    @if (question(); as question) {
    <div class="preview-container">
      <div class="preview">
        <p>{{ question.question }}</p>
        <mat-radio-group [(ngModel)]="answer">
          @for(option of question.choices; track $index) {
          <mat-radio-button [value]="option.value">{{
            option.value
          }}</mat-radio-button>
          }
        </mat-radio-group>
      </div>
      <div class="preview-action-group">
        <button mat-button type="button" (click)="submittedAnswer.emit(answer())">
          Submit
        </button>
      </div>
    </div>
    } @else {
     <h1>No question to display</h1>
    }
  `,
  styles: [
    `
      h1 {
        font: var(--mat-sys-display-large);
      }

      .preview-container {
        mat-radio-button {
          display: block;
          margin: 1rem 1rem;
        }
        .preview-action-group {
          float: right;
        }
      }
    `,
  ],
})
export class TestQuestionComponent {
  submittedAnswer = output<string>();
  question = input<ITestQuestion>();

  answer = linkedSignal({
    source: this.question,
    computation: () => '', // Reset the answer when the question changes
  });
}
