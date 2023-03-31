import { AuthGuard } from '../../../../shared/guards/auth.guard';
import { WorkshopsComponent } from './workshops.component';
import { Route } from '@angular/router';
import { sectionResolver } from '../../../../shared/resolvers/section.resolver';

export const WORKSHOPS_ROUTES: Route[] = [
  {
    path: ':section',
    component: WorkshopsComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'workshop-list'
      },
      {
        canActivate: [AuthGuard],
        path: 'workshop-list',
        loadChildren: () => import('./workshops-pages/workshop-list/workshop-list.component').then(m => m.WorkshopListComponent)
      },
      {
        canActivate: [AuthGuard],
        path: ':categoryId',
        resolve: { sectionResolver },
        loadChildren: () => import('./workshops-pages/workshop-detail/workshop-detail.module').then(m => m.WorkshopDetailModule)
      },
    ]
  }
];
