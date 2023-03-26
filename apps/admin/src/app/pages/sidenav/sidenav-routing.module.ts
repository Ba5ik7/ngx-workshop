import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../guards/auth.guard';
import { SidenavComponent } from './sidenav.component';

const routes: Routes = [
  {
    path: '',
    component: SidenavComponent,
    children: [
      {
        canActivate: [AuthGuard],
        path: 'dashboard',
        loadChildren: () => import('./sidenav-pages/dashboard/dashboard.routing').then(m => m.DASHBOARD_ROUTES)
      },
      {
        canActivate: [AuthGuard],
        path: 'users',
        loadChildren: () => import('./sidenav-pages/users/users.routing').then(m => m.USERS_ROUTES)
      },
      {
        canActivate: [AuthGuard],
        path: 'settings',
        loadChildren: () => import('./sidenav-pages/settings/settings.routing').then(m => m.SETTINGS_ROUTES)
      },
      {
        canActivate: [AuthGuard],
        path: 'chat', loadChildren: () => import('./sidenav-pages/chat/chat.routing').then(m => m.CHAT_ROUTES)
      },
      {
        canActivate: [AuthGuard],
        path: 'workshop-editor',
        loadChildren: () => import('../workshop-editor/workshop-editor.module').then(m => m.WorkshopEditorModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkshopSidenavRoutingModule { }
