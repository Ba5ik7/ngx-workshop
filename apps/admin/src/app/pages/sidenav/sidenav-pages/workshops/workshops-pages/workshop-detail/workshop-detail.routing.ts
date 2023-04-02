import { Route } from '@angular/router';
import { documentResolver } from '../../../../../../shared/resolvers/document.resolver';
import { WorkshopDetailComponent } from './workshop-detail.component';

export const WORKSHOPS_DETAIL_ROUTES: Route[] = [
  { 
    path: '',
    data: { alwaysRefresh: true },
    resolve: { documentResolver },
    component: WorkshopDetailComponent
  },
  { 
    path: ':documentId',
    data: { alwaysRefresh: true },
    resolve: { documentResolver },
    component: WorkshopDetailComponent
  },
  { path: '**', redirectTo: '/404' }
];
