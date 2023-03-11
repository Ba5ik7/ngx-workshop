import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkshopCategoryListComponent } from './workshop-category-list.component';

const routes: Routes = [{ path: '', component: WorkshopCategoryListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkshopCategoryListRoutingModule { }
