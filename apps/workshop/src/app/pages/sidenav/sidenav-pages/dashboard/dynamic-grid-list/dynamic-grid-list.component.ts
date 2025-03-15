import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { map, withLatestFrom } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver, LayoutModule } from '@angular/cdk/layout';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { AssessmentTestService } from 'apps/workshop/src/app/shared/services/assessment-test/assessment-test.service';

@Component({
    imports: [
        CommonModule,
        MatGridListModule,
        MatCardModule,
        MatMenuModule,
        MatIconModule,
        MatButtonModule,
        LayoutModule
    ],
    selector: 'ngx-dynamic-grid-list',
    template: `
    <div class="grid-container">
      <mat-grid-list cols="2" rowHeight="350px">
        <mat-grid-tile *ngFor="let card of cards | async" [colspan]="card.cols" [rowspan]="card.rows">
          <mat-card appearance="outlined" class="dashboard-card">
            <mat-card-header>
              <mat-card-title>
                {{card.title}}
                <button mat-icon-button class="more-button" [matMenuTriggerFor]="menu" aria-label="Toggle menu">
                  <mat-icon>more_vert</mat-icon>
                </button>
                <mat-menu #menu="matMenu" xPosition="before">
                  <button mat-menu-item>Expand</button>
                  <button mat-menu-item>Remove</button>
                </mat-menu>
              </mat-card-title>
            </mat-card-header>
            <mat-card-content class="dashboard-card-content">
              <pre><code>{{card.assessmentTest | json }}</code></pre>
            </mat-card-content>
          </mat-card>
        </mat-grid-tile>
      </mat-grid-list>
    </div>
  `,
    styles: [`
    .grid-container { margin: 20px; }
    .dashboard-card {
      position: absolute;
      top: 15px;
      left: 15px;
      right: 15px;
      bottom: 15px;
      overflow: auto;
    }
    .more-button {
      position: absolute;
      top: 5px;
      right: 10px;
    }
  `],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicGridListComponent {

  assessmentTest = inject(AssessmentTestService);
  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    withLatestFrom(this.assessmentTest.assessmentTest$),
    map(([{ matches }, assessmentTest]) => {
      if (matches) {
        return [
          { title: 'Card 1', cols: 1, rows: 1, assessmentTest },
          { title: 'Card 2', cols: 1, rows: 1, assessmentTest: 'Hello' },
          { title: 'Card 3', cols: 1, rows: 1, assessmentTest: 'Hello' },
          { title: 'Card 4', cols: 1, rows: 1, assessmentTest: 'Hello' }
        ];
      }

      return [
        { title: 'Card 1', cols: 2, rows: 1, assessmentTest },
        { title: 'Card 2', cols: 1, rows: 1, assessmentTest: 'Hello' },
        { title: 'Card 3', cols: 1, rows: 2, assessmentTest: 'Hello' },
        { title: 'Card 4', cols: 1, rows: 1, assessmentTest: 'Hello' }
      ];
    })
  );

  constructor(private breakpointObserver: BreakpointObserver) {}
}
