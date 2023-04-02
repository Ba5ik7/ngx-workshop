import { AuthGuard } from '../../../../shared/guards/auth.guard';
import { WorkshopsComponent } from './workshops.component';
import { Route } from '@angular/router';
import { sectionResolver } from '../../../../shared/resolvers/section.resolver';
import { workshopResolver } from '../../../../shared/resolvers/workshop.resolver';

export const WORKSHOPS_ROUTES: Route[] = [
  {
    path: ':section',
    resolve: { sectionResolver },
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
        resolve: { workshopResolver },
        loadComponent: () => import('./workshops-pages/workshop-list/workshop-list.component').then(m => m.WorkshopListComponent)
      },
      {
        canActivate: [AuthGuard],
        path: ':categoryId',
        loadChildren: () => import('./workshops-pages/workshop-detail/workshop-detail.module').then(m => m.WorkshopDetailModule)
      },
    ]
  }
];
