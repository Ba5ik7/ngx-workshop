import { Injectable } from '@angular/core';
import { 
  ActivatedRouteSnapshot, 
  DetachedRouteHandle, 
  RouteReuseStrategy, 
  Routes
} from '@angular/router';

@Injectable()
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
  { 
    path: '',
    pathMatch: 'full',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule)
  },
  // Navbar links to redirect to workshop-sidenav module
  { path: 'angular', pathMatch: 'full', redirectTo: '/angular/categories' },
  { path: 'nestjs', pathMatch: 'full', redirectTo: '/nestjs/categories' },
  { path: 'rxjs', pathMatch: 'full', redirectTo: '/rxjs/categories' },
  { path: 'account', loadChildren: () => import('./pages/account/account.module').then(m => m.AccountModule) },
  { path: 'settings', loadChildren: () => import('./pages/settings/settings.module').then(m => m.SettingsModule) },
  // This ne`eds to before the workshop-sidenav route becuase missing routes in that module will redirect to this 404 route
  { path: '404', loadChildren: () => import('./pages/not-found/not-found.module').then(m => m.NotFoundModule) },
  {
    path: ':section',
    loadChildren: () => import('./pages/workshop-sidenav/workshop-sidenav.module').then(m => m.WorkshopSidenavModule)
  },
  { path: '**', redirectTo: '/404' },
];