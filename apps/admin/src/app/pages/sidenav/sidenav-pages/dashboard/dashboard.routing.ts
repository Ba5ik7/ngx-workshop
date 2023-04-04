import { Route } from '@angular/router';
import { workshopResolver } from '../../../../shared/resolvers/workshop.resolver';
import { DashboardComponent } from './dashboard.component';

export const DASHBOARD_ROUTES: Route[] = [
  { path: '', redirectTo: 'overview', pathMatch: 'full' },
  {
    path: 'overview',
    resolve: { workshopResolver },
    component: DashboardComponent
  }
];
