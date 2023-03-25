import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../guards/auth.guard';
import { WorkshopSidenavComponent } from './workshop-sidenav.component';

const routes: Routes = [
  {
    path: '',
    component: WorkshopSidenavComponent,
    children: [
      {
        canActivate: [AuthGuard],
        path: 'dashboard',
        loadChildren: () => import('../dashboard/dashboard.routing').then(m => m.DASHBOARD_ROUTES)
      },
      {
        canActivate: [AuthGuard],
        path: 'users',
        loadChildren: () => import('../users/users.routing').then(m => m.USERS_ROUTES)
      },
      {
        canActivate: [AuthGuard],
        path: 'settings',
        loadChildren: () => import('../settings/settings.module').then(m => m.SettingsModule)
      },
      {
        canActivate: [AuthGuard],
        path: 'chat', loadChildren: () => import('../chat/chat.module').then(m => m.ChatModule)
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
