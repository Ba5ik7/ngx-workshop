import {
  ChangeDetectionStrategy,
  Component,
  Directive,
  inject,
  input,
  Input,
  OnInit,
  signal,
  Type,
  ViewContainerRef,
} from '@angular/core';
import { map } from 'rxjs/operators';
import {
  Breakpoints,
  BreakpointObserver,
  LayoutModule,
} from '@angular/cdk/layout';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { combineLatest } from 'rxjs';

import {
  AssessmentTestService,
  SubjectLevel,
} from '../../../../../shared/services/assessment-test/assessment-test.service';
import { TestsInfoWidgetComponent } from '../widgets/tests-info-widget.component';
import { TodoWidgetComponent } from '../widgets/todo-widget.component';

export interface WidgetConfig {
  id: string;
  title: string;
  componentType: Type<any>;
  data?: any;
  cols: number;
  rows: number;
}

@Directive({
  selector: '[ngxDynamicWidget]',
})
export class DynamicWidgetDirective implements OnInit {
  @Input() componentType!: Type<any>;
  @Input() data: any;

  vcr = inject(ViewContainerRef);

  ngOnInit() {
    const componentRef = this.vcr.createComponent(this.componentType);
    componentRef.setInput('data', this.data);
    if (this.data) {
      Object.assign(componentRef.instance, this.data);
    }
  }
}

@Component({
  selector: 'app-some-widget',
  imports: [CommonModule, MatExpansionModule],
  template: ` <pre>{{ data() | json }}</pre> `,
})
export class SomeWidgetComponent {
  panelOpenState = signal(false);
  data = input.required<SubjectLevel[]>();
}

@Component({
  imports: [
    CommonModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule,
    DynamicWidgetDirective,
  ],
  selector: 'ngx-dynamic-grid-list',
  template: `
    <div class="grid-container">
      <mat-grid-list cols="2" rowHeight="350px">
        @for (widget of widgets | async; track $index) {
        <mat-grid-tile [colspan]="widget.cols" [rowspan]="widget.rows">
          <mat-card appearance="outlined" class="dashboard-card">
            <mat-card-title>
              <button
                mat-icon-button
                class="more-button"
                [matMenuTriggerFor]="menu"
                aria-label="Toggle menu"
              >
                <mat-icon>more_vert</mat-icon>
              </button>
              <mat-menu #menu="matMenu" xPosition="before">
                <button mat-menu-item (click)="thinOrWide(widget)">
                  {{ widget.cols === 1 ? 'Wide' : 'Thin' }}
                </button>
                <button mat-menu-item (click)="shortOrTall(widget)">
                  {{ widget.rows === 1 ? 'Tall' : 'Short' }}
                </button>
              </mat-menu>
            </mat-card-title>
            <mat-card-content>
              <div
                ngxDynamicWidget
                [componentType]="widget.componentType"
                [data]="widget.data"
              ></div>
            </mat-card-content>
          </mat-card>
        </mat-grid-tile>
        }
      </mat-grid-list>
    </div>
  `,
  styles: [
    `
      .grid-container {
        margin: 20px;
      }
      .dashboard-card {
        color: var(--mat-sys-on-secondary-container);
        background-color: var(--mat-sys-secondary-container);
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
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicGridListComponent {
  assessmentTest = inject(AssessmentTestService);
  breakpointObserver = inject(BreakpointObserver);

  thinOrWide(widget: WidgetConfig) {
    widget.cols = widget.cols === 2 ? 1 : 2;
  }

  shortOrTall(widget: WidgetConfig) {
    widget.rows = widget.rows === 2 ? 1 : 2;
  }

  widgets = combineLatest([
    this.breakpointObserver.observe(Breakpoints.Handset),
    this.assessmentTest.fetchUsersAssessments(),
    this.assessmentTest.fetchUserSubjectsEligibility([
      'ANGULAR',
      'NESTJS',
      'RXJS',
    ]),
  ]).pipe(
    map(([{ matches }, assessmentTests, subjectLevels]) => {
      const testInfoWidgetData = { assessmentTests, subjectLevels };

      if (matches) {
        return [
          {
            id: 'widget1',
            title: 'Test Widget',
            componentType: SomeWidgetComponent,
            data: testInfoWidgetData,
            cols: 1,
            rows: 1,
          },
        ];
      }
      return [
        {
          id: 'widget1',
          title: 'Test Widget',
          componentType: SomeWidgetComponent,
          data: testInfoWidgetData,
          cols: 2,
          rows: 1,
        },
        {
          id: 'widget2',
          title: 'Test Widget 2',
          componentType: TodoWidgetComponent,
          data: testInfoWidgetData,
          cols: 1,
          rows: 1,
        },
        {
          id: 'widget3',
          title: 'Test Widget 3',
          componentType: TestsInfoWidgetComponent,
          data: testInfoWidgetData,
          cols: 1,
          rows: 2,
        },
        {
          id: 'widget4',
          title: 'Test Widget 4',
          componentType: SomeWidgetComponent,
          data: testInfoWidgetData,
          cols: 1,
          rows: 1,
        },
      ];
    })
  );
}
