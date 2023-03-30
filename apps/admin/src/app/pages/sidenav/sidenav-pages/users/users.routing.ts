import { Route } from '@angular/router';
import { workshopResolver } from '../../../../shared/resolvers/workshop.resolver';
import { UsersComponent } from './users.component';

export const USERS_ROUTES: Route[] = [
  { path: '', redirectTo: 'overview', pathMatch: 'full' },
  {
    path: 'overview',
    resolve: { workshopResolver },
    component: UsersComponent
  }
];
