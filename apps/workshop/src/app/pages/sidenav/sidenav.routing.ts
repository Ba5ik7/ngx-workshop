import { AuthGuard } from '../../shared/guards/auth.guard';
import { SidenavComponent } from './sidenav.component';
import { Route } from '@angular/router';
import { sectionResolver } from '../../shared/resolvers/section.resolver';

export const SIDENAV_ROUTES: Route[] = [
  {
    path: '',
    component: SidenavComponent,
    
    children: [
      {
        canActivate: [AuthGuard],
        resolve: { sectionResolver },
        path: 'dashboard',
        loadChildren: () => import('./sidenav-pages/dashboard/dashboard.routing').then(m => m.DASHBOARD_ROUTES)
      },
      {
        canActivate: [AuthGuard],
        path: 'settings',
        resolve: { sectionResolver },
        loadChildren: () => import('./sidenav-pages/settings/settings.routing').then(m => m.SETTINGS_ROUTES)
      },
      {
        canActivate: [AuthGuard],
        path: 'account',
        resolve: { sectionResolver },
        loadComponent: () => import('./sidenav-pages/account/account.component').then(m => m.AccountComponent)
      },
      // {
      //   canActivate: [AuthGuard],
      //   resolve: { sectionResolver },
      //   path: 'chat', loadChildren: () => import('./sidenav-pages/chat/chat.routing').then(m => m.CHAT_ROUTES)
      // },
      {
        path: 'workshops',
        loadChildren: () => import('./sidenav-pages/workshops/workshops.routing').then(m => m.WORKSHOPS_ROUTES)
      }
    ]
  }
];
