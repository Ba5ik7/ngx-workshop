import {
  ActivatedRouteSnapshot,
  DetachedRouteHandle,
  RouteReuseStrategy,
  Routes,
} from '@angular/router';
import { NavigationService } from './shared/services/navigation/navigation.service';
import { Injectable, inject } from '@angular/core';
import { UserStateService } from './shared/services/user-state/user-state.service';
import { ThemePickerService } from './shared/services/theme-picker/theme-picker.service';

@Injectable({ providedIn: 'root' })
export class WorkshopReuseStrategy extends RouteReuseStrategy {
  retrieve(): DetachedRouteHandle | null {
    return null;
  }
  shouldAttach(): boolean {
    return false;
  }
  shouldDetach(): boolean {
    return false;
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  store(): void {}
  shouldReuseRoute(
    future: ActivatedRouteSnapshot,
    curr: ActivatedRouteSnapshot
  ): boolean {
    if (future.routeConfig === curr.routeConfig) {
      return !future.data['alwaysRefresh'];
    } else {
      return false;
    }
  }
}

export const appRoutes: Routes = [
  {
    path: '',
    resolve: {
      sections: () => inject(NavigationService).fetchSections(),
      isLoggedIn: () => inject(UserStateService).isUserLoggedIn(),
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadComponent: () =>
          import('./pages/home/home.component').then((m) => m.HomeComponent),
      },
      // {
      //   path: 'account',
      //   loadChildren: () => import('./pages/account/account.module').then(m => m.AccountModule)
      // },
      // {
      //   path: 'settings',
      //   loadChildren: () => import('./pages/settings/settings.module').then(m => m.SettingsModule)
      // },
      {
        path: '404',
        loadChildren: () =>
          import('./pages/not-found/not-found.routing').then(
            (m) => m.NOT_FOUND_ROUTES
          ),
      },
      {
        path: 'assessment-test',
        loadComponent: () =>
          import('./pages/assessment-test/assessment-test.component').then(
            (m) => m.AssessmentTestComponent
          ),
      },
      {
        path: 'sidenav',
        loadChildren: () =>
          import('./pages/sidenav/sidenav.routing').then(
            (m) => m.SIDENAV_ROUTES
          ),
      },
      {
        path: '**',
        redirectTo: '/404',
      },
    ],
  },
];
