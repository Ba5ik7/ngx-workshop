import { Route } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

export const DASHBOARD_ROUTES: Route[] = [
  { path: '', redirectTo: 'overview', pathMatch: 'full' },
  {
    path: 'overview',
    // resolve: { assessmentTestResolver },
    component: DashboardComponent
  }
];
