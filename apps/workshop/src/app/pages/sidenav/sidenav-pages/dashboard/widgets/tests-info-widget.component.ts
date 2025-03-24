import { CommonModule } from '@angular/common';
import { Component, signal, input } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import {
  IUserAssessmentTest,
  SubjectLevel,
} from '../../../../../shared/services/assessment-test/assessment-test.service';
import { MatDivider } from '@angular/material/divider';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { map, timer } from 'rxjs';

type TestInfo = {
  assessmentTests: IUserAssessmentTest[];
  subjectLevels: SubjectLevel[];
};

interface TestInfoViewModel {
  subjectLevels: {
    subjectTitle: string;
    levelCount: number;
    completedTests?: {
      testName: string;
      score: number;
      questionsLength: number;
      scorePercent: number;
    }[];
    incompleteTests?: {
      testName: string;
    }[];
  }[];
}

@Component({
  selector: 'ngx-tests-info-widget',
  imports: [CommonModule, MatExpansionModule, MatProgressBarModule, MatDivider, MatButtonModule, RouterLink],
  template: `
    <h2>Assessment Tests</h2>
    <mat-accordion>
      @for (subject of data().subjectLevels; track $index) {
      <mat-expansion-panel [expanded]="subject.subjectTitle === 'ANGULAR' && (openPanelDelay | async)" >
        <mat-expansion-panel-header>
          <mat-panel-title> {{ subject.subjectTitle }} </mat-panel-title>
          <mat-panel-description>
            Level {{ subject.levelCount }}
          </mat-panel-description>
        </mat-expansion-panel-header>
        <!-- <p>{{ subject | json }}</p> -->

        @if (subject.incompleteTests?.length) {
          <div class="info-container">
            <h2>Incomplete Test:</h2>
            <mat-divider></mat-divider>
            @for (test of subject.incompleteTests; track $index) {
            <div class="incomplete-test">
              <h3>{{ test.testName }}</h3>
              <a mat-stroked-button routerLink="/assessment-test">Start Test</a>
            </div>
            }
          </div>
        }

        @if (subject.completedTests?.length) {
          <div class="info-container">
            <h2>Completed Tests:</h2>
            <mat-divider></mat-divider>
            @for (test of subject.completedTests; track $index) {
              <h3>{{ test.testName }}</h3>
              <p class="float-left-clear">
                Score: {{ test.score }}/{{ test.questionsLength }}
              </p>
              <p class="float-right">{{ test.scorePercent }}%</p>
              <mat-progress-bar
                mode="determinate"
                value="{{ test.scorePercent }}"
              ></mat-progress-bar>
            }
          </div>
        } @else {
          <h2>No completed tests</h2>
        }
      </mat-expansion-panel>
      }
    </mat-accordion>
  `,
  styles: [
    `
      :host {
        .info-container {
          margin-bottom: 36px;
        }
        .incomplete-test {
          display: flex;
          flex-direction: row;
          align-items: flex-end;
          justify-content: space-between;
        }
        h2 {
          font-weight: 300;
          margin: 12px 0;
        }
        h3 {
          font-weight: 400;
          margin: 24px 0 4px;
        }
        p {
          font-weight: 300;
          margin: 0 0 4px;
        }
        .float-left-clear {
          float: left;
          clear: both;
        }
        .float-right {
          float: right;
        }

      }
    `,
  ],
})
export class TestsInfoWidgetComponent {
  openPanelDelay = timer(800).pipe(map(() => true));

  data = input.required<TestInfoViewModel, TestInfo>({
    transform: (data) => {
      const subjectLevels = data.subjectLevels.map((subject) => {
        const testsForSubject = data.assessmentTests.filter(
          (test) => test.subject === subject.subject
        );

        const incompleteTests = testsForSubject.filter(
          (test) => !test.completed
        );
        const completedTests = testsForSubject
          .filter((test) => test.completed)
          .map((test) => {
            return {
              testName: test.testName,
              score: test.score,
              questionsLength: test.userAnswers.length,
              scorePercent: (test.score / test.userAnswers.length) * 100,
            };
          });

        return {
          subjectTitle: subject.subject,
          levelCount: subject.levelCount,
          incompleteTests,
          completedTests,
        };
      });

      return { subjectLevels };
    },
  });
}
