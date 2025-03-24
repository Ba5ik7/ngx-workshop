import { Route } from '@angular/router';
import { DashboardComponent, OverviewComponent } from './dashboard.component';

export const DASHBOARD_ROUTES: Route[] = [
  { path: '', redirectTo: 'overview', pathMatch: 'full' },
  {
    path: 'overview',
    component: DashboardComponent,
    children: [
      {
        path: '',
        component: OverviewComponent,
      },
    ],
  }
];
