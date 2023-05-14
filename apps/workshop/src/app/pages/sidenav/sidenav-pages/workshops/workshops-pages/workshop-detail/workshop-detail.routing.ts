import { Route } from '@angular/router';
import { documentResolver } from '../../../../../../shared/resolvers/document.resolver';
import { WorkshopDetailComponent, WorkshopDetailAnimationComponent } from './workshop-detail.component';

export const WORKSHOPS_DETAIL_ROUTES: Route[] = [
  {
    path: '',
    component: WorkshopDetailAnimationComponent,
    children: [
      {
        path: ':documentId',
        data: { alwaysRefresh: true, animation: 'WorkshopDetailPage' },
        resolve: { documentResolver },
        component: WorkshopDetailComponent
      }
    ]
  },
  { path: '**', redirectTo: '/404' }
];
