import { AuthGuard } from '../../../../shared/guards/auth.guard';
import { WorkshopsComponent } from './workshops.component';
import { Route } from '@angular/router';

export const WORKSHOPS_ROUTES: Route[] = [
  {
    path: ':section',
    component: WorkshopsComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'workshop-category-list'
      },
      {
        canActivate: [AuthGuard],
        path: 'workshop-category-list',
        loadChildren: () => import('./workshops-pages/workshop-category-list/workshop-category-list.module').then(m => m.WorkshopCategoryListModule)
      },
      {
        canActivate: [AuthGuard],
        path: ':categoryId',
        loadChildren: () => import('./workshops-pages/workshop-detail/workshop-detail.module').then(m => m.WorkshopDetailModule)
      },
    ]
  }
];
