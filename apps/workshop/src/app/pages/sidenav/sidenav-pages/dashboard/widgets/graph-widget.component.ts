import { CommonModule } from '@angular/common';
import { Component, signal, input } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { NgxChartsModule, ScaleType } from '@swimlane/ngx-charts';

import { SubjectLevel } from '../../../../../shared/services/assessment-test/assessment-test.service';
import { map, timer } from 'rxjs';

export var multi = [
  {
    name: 'Angular',
    series: [
      {
        name: 'Monday',
        value: 2,
      },
      {
        name: 'Tuseday',
        value: 0,
      },
      {
        name: 'Wednesday',
        value: 1,
      },
      {
        name: 'Thursday',
        value: 0,
      },
      {
        name: 'Friday',
        value: 4,
      },
    ],
  },

  {
    name: 'NestJs',
    series: [
      {
        name: 'Monday',
        value: 1,
      },
      {
        name: 'Tuseday',
        value: 0,
      },
      {
        name: 'Wednesday',
        value: 0,
      },
      {
        name: 'Thursday',
        value: 1,
      },
      {
        name: 'Friday',
        value: 0,
      },
    ],
  },

  {
    name: 'RxJs',
    series: [
      {
        name: 'Monday',
        value: 0,
      },
      {
        name: 'Tuseday',
        value: 0,
      },
      {
        name: 'Wednesday',
        value: 3,
      },
      {
        name: 'Thursday',
        value: 1,
      },
      {
        name: 'Friday',
        value: 0,
      },
    ],
  },
];

@Component({
  selector: 'ngx-graph-widget',
  imports: [CommonModule, MatExpansionModule, NgxChartsModule],
  template: `
    @if(delayView | async) {
      <ngx-charts-line-chart
        [scheme]="colorScheme"
        [legend]="legend"
        [legendTitle]="legendTitle"
        [showXAxisLabel]="showXAxisLabel"
        [showYAxisLabel]="showYAxisLabel"
        [xAxis]="xAxis"
        [yAxis]="yAxis"
        [xAxisLabel]="xAxisLabel"
        [yAxisLabel]="yAxisLabel"
        [timeline]="timeline"
        [results]="multi"
        [autoScale]="autoScale"
        (select)="onSelect($event)"
        (activate)="onActivate($event)"
        (deactivate)="onDeactivate($event)"
      >
      </ngx-charts-line-chart>
    }
  `,
  styles: [
    `
      :host {
        display: block;
        // max-height: 324px;
        // padding-top: 24px;

        &::ng-deep .ngx-charts .gridline-path {
          color: var(--mat-sys-on-secondary-container)!important;
          stroke: var(--mat-sys-on-secondary-container)!important;
          fill: var(--mat-sys-on-secondary-container)!important;
        }
        &::ng-deep .ngx-charts {
          font-weight: 100;
          font-size: 1.5rem;
        }
      }

    `,
  ],
})
export class GraphWidgetComponent {
  delayView = timer(1000).pipe(map(() => true));

  panelOpenState = signal(false);
  data = input.required<SubjectLevel[]>();

  multi!: any[];

  // line, area
  autoScale = true;

  strokeColor = '#FFFFFF';

  // options
  legend = true;
  legendTitle = 'Subjects';
  showLabels = false;
  animations = true;
  xAxis = true;
  yAxis = true;
  showYAxisLabel = true;
  showXAxisLabel = false;
  xAxisLabel = 'Week';
  yAxisLabel = 'Tasks Completed';
  timeline = true;

  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#7aa3e5', '#CFC0BB',  '#a8385d', '#aae3f5'],
    group: ScaleType.Ordinal,
    name: 'cool',
    selectable: true,
  };

  constructor() {
    Object.assign(this, { multi });
  }

  onSelect(data: unknown): void {
    // console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: unknown): void {
    // console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: unknown): void {
    // console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
}
