import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { documentResolver } from '../../../../../../../app/shared/resolvers/document.resolver';
import { WorkshopDetailComponent } from './workshop-detail.component';

const routes: Routes = [
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

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkshopDetailRoutingModule { }
