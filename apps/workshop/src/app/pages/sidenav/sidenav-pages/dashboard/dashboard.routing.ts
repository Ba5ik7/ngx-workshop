import { Route } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { assessmentTestResolver } from '../../../../shared/resolvers/assessment-test.resolver';

export const DASHBOARD_ROUTES: Route[] = [
  { path: '', redirectTo: 'overview', pathMatch: 'full' },
  {
    path: 'overview',
    resolve: { assessmentTestResolver },
    component: DashboardComponent
  }
];
