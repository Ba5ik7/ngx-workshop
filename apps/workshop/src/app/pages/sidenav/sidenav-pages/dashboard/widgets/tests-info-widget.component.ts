import { CommonModule } from '@angular/common';
import { Component, signal, input } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { SubjectLevel } from '../../../../../shared/services/assessment-test/assessment-test.service';

@Component({
  selector: 'ngx-tests-info-widget',
  imports: [CommonModule, MatExpansionModule],
  template: `
    <h2>Assessment Tests</h2>
    <mat-accordion>
      @for (subject of data(); track $index) {
      <mat-expansion-panel>
        <mat-expansion-panel-header>
          <mat-panel-title> {{ subject.subject }} </mat-panel-title>
          <mat-panel-description>
            Level {{ subject.levelCount }}
          </mat-panel-description>
        </mat-expansion-panel-header>
        <p>{{ subject | json }}</p>
      </mat-expansion-panel>
      }
      <!-- <mat-expansion-panel
        (opened)="panelOpenState.set(true)"
        (closed)="panelOpenState.set(false)"
      >
        <mat-expansion-panel-header>
          <mat-panel-title> Self aware panel </mat-panel-title>
          <mat-panel-description>
            Currently I am {{ panelOpenState() ? 'open' : 'closed' }}
          </mat-panel-description>
        </mat-expansion-panel-header>
        <p>I'm visible because I am open</p>
      </mat-expansion-panel> -->
    </mat-accordion>
  `,
})
export class TestsInfoWidgetComponent {
  panelOpenState = signal(false);
  data = input.required<SubjectLevel[]>();
}
