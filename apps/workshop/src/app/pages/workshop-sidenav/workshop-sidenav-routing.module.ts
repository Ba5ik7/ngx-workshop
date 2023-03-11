import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../guards/auth.guard';
import { WorkshopCategoryListComponent } from './workshop-category-list/workshop-category-list.component';
import { WorkshopSidenavComponent } from './workshop-sidenav.component';

const routes: Routes = [
  {
    path: '',
    component: WorkshopSidenavComponent,
    children: [
      {
        path: 'categories',
        children: [
          {
            path: '', component: WorkshopCategoryListComponent,
            loadChildren: () => import('./workshop-category-list/workshop-category-list.module').then(m => m.WorkshopCategoryListModule)
          },
        ],
      },
      {
        canActivate: [AuthGuard],
        path: 'dashboard',
        loadChildren: () => import('../dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: ':categoryId',
        children: [
          {
            path: '',
            data: { alwaysRefresh: false },
            loadChildren: () => import('./workshop-detail/workshop-detail.module').then(m => m.WorkshopDetailModule)
          },
        ],
      },
      { path: '**', redirectTo: '/404' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkshopSidenavRoutingModule { }
