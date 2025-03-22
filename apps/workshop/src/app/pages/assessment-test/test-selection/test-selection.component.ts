import { Component, input, linkedSignal, output } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { SubjectLevel } from '../../../shared/services/assessment-test/assessment-test.service';

type SubjectCard = { value: string; enabled: boolean, image: string, level: number };
const subjectsMap = new Map<string, SubjectCard>([
  ['NESTJS', { value: 'NestJS', enabled: false, image: 'nestjs2.svg', level: 0 }],
  ['ANGULAR', { value: 'Angular', enabled: false, image: 'angular_nav_gradient.gif', level: 0 }],
  ['RXJS', { value: 'RxJS', enabled: false, image: 'rxjs1.svg', level: 0 }],
]);

@Component({
  selector: 'ngx-test-selection',
  imports: [MatButton],
  template: `
    <h1>Select a subject to start assessment test.</h1>
    <div class="assessment-test-selection-wrapper">
      @for (subject of enabledSubjects(); track subject.value) {
      <a
        class="assessment-test-selection"
      >
        <img src="../../../assets/img/{{subject.image}}" />
        <h2>{{ subject.value }}</h2>
        <p>Level {{ subject.level }}</p>
        <button
          mat-stroked-button
          [disabled]="!subject.enabled"
          (click)="startTest.emit(subject.value.toUpperCase())"
        >
          {{ subject.enabled ? 'Start Test' : 'Come back later' }}
        </button>
      </a>
      } @empty {
      <p>No tests available</p>
      }
    </div>
  `,
  styles: [
    `
      :host {
        h1 {
          font-size: 2.5rem;
          font-weight: 300;
          margin: 0 0 24px;
        }
        h2 {
          font-size: 2rem;
          font-weight: 400;
          margin: 0 0 4px;
        }

        p {
          font-size: 1.3rem;
          font-weight: 300;
          line-height: 1.75rem;
          margin: 0 0 24px 0;
        }
        .assessment-test-selection-wrapper {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 48px;
          .assessment-test-selection {
            display: flex;
            flex-direction: column;
            img {
              width: 200px;
              height: 200px;
            }
          }
        }
      }
    `,
  ],
})
export class TestSelectionComponent {
  startTest = output<string>();
  subjectEligibility = input<SubjectLevel[]>([]);

  enabledSubjects = linkedSignal<SubjectLevel[], SubjectCard[]>({
    source: this.subjectEligibility,
    computation: (subjects) => {
      subjectsMap.forEach((subjectCard, key) => {
        const matchingSubject = subjects.find(
          (subj) => subj.subject.toUpperCase() === key
        );
        if (matchingSubject) {
          subjectCard.level = matchingSubject.levelCount;
          subjectCard.enabled = matchingSubject.enabled;
        }
      });
      return Array.from(subjectsMap.values());
    },
  });
}
