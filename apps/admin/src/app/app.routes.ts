import { Injectable, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  DetachedRouteHandle,
  RouteReuseStrategy,
  Routes
} from '@angular/router';
import { AuthGuard } from './shared/guards/auth.guard';
import { NavigationService } from './shared/services/navigation/navigation.service';

@Injectable()
export class WorkshopReuseStrategy extends RouteReuseStrategy {
  retrieve(): DetachedRouteHandle | null { return null; }
  shouldAttach(): boolean { return false; }
  shouldDetach(): boolean { return false; }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  store(): void {}
  shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    if (future.routeConfig === curr.routeConfig) {
      return !future.data['alwaysRefresh'];
    } else {
        return false;
    }
  }
}

export const appRoutes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.routing').then(m => m.LOGIN_ROUTES)
  },
  { 
    path: '',   
    resolve: { sections: () => inject(NavigationService).fetchSections() },
    children: [
      { path: '', redirectTo: '/login', pathMatch: 'full' },
      {
        path: 'auth',
        loadChildren: () => import('./pages/sidenav/sidenav.routing').then(m => m.SIDENAV_ROUTES),
        canActivate: [AuthGuard]
      },
      {
        path: '404',
        loadChildren: () => import('./pages/not-found/not-found.routing').then(m => m.NOT_FOUND_ROUTES)
      },
      { path: '**', redirectTo: '/404' },
    ]
  },
];
