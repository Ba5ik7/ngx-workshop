import { Route } from '@angular/router';
import { workshopResolver } from '../../../../shared/resolvers/workshop.resolver';
import { SettingsComponent } from './settings.component';

export const SETTINGS_ROUTES: Route[] = [
  { path: '', redirectTo: 'overview', pathMatch: 'full' },
  {
    path: 'overview',
    resolve: { workshopResolver },
    component: SettingsComponent
  }
];
