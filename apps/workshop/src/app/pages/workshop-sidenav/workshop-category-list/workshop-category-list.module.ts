import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card'

import { WorkshopCategoryListComponent } from './workshop-category-list.component';
import { WorkshopCategoryListRoutingModule } from './workshop-category-list-routing.module';



@NgModule({
  declarations: [WorkshopCategoryListComponent],
  imports: [
    CommonModule,
    MatCardModule,
    WorkshopCategoryListRoutingModule
  ]
})
export class WorkshopCategoryListModule { }
