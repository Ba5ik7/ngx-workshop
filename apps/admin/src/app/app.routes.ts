import { ActivatedRouteSnapshot, DetachedRouteHandle, RouteReuseStrategy, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

export class WorkshopReuseStrategy extends RouteReuseStrategy {
  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null { return null; }
  shouldAttach(route: ActivatedRouteSnapshot): boolean { return false; }
  shouldDetach(route: ActivatedRouteSnapshot): boolean { return false; }
  store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle | null): void { }
  shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    if (future.routeConfig === curr.routeConfig) {
      return !future.data['alwaysRefresh'];
    } else {
        return false;
    }
  }
}

export const appRoutes: Routes = [
  { path: '',   redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.routing').then(m => m.LOGIN_ROUTES)
  },
  {
    path: 'auth',
    loadChildren: () => import('./pages/sidenav/sidenav.module').then(m => m.WorkshopSidenavModule),
    canActivate: [AuthGuard]
  },
  {
    path: '404',
    loadChildren: () => import('./pages/not-found/not-found.routing').then(m => m.NOT_FOUND_ROUTES)
  },
  { path: '**', redirectTo: '/404' },
];
