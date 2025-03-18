import { AsyncPipe, JsonPipe } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';

// {
//   "question": "What is Angular?",
//   "choices": [
//       {
//           "value": "A framework"
//       },
//       {
//           "value": "A library"
//       },
//       {
//           "value": "A programming language"
//       },
//       {
//           "value": "A database"
//       }
//   ],
//   "answer": "A framework",
//   "correctResponse": "Correct! Angular is a framework.",
//   "incorrectResponse": "Incorrect. Angular is a framework."
// },

@Component({
  selector: 'ngx-test-question',
  imports: [ReactiveFormsModule, MatButton, MatRadioModule],
  template: `
    @if (question(); as question) {
    <div class="preview-container">
      <div class="preview">
        <p>{{ question.question }}</p>
        <mat-radio-group [value]="question.answer">
          @for(option of question.choices; track $index) {
          <mat-radio-button [value]="option.value">{{
            option.value
          }}</mat-radio-button>
          }
        </mat-radio-group>
      </div>
      <div class="preview-action-group">
        <button mat-button type="button" (click)="answer.emit()">Submit</button>
      </div>
    </div>
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
  answer = output();
  question = input<any>();
}
