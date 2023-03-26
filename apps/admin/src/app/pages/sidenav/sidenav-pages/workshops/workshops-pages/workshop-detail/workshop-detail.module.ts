import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkshopDetailComponent } from './workshop-detail.component';
import { WorkshopViewerModule } from '../../../../../../shared/components/workshop-viewer/workshop-viewer.module';
import { RouterModule } from '@angular/router';
import { WorkshopDetailRoutingModule } from './workshop-detail-routing.module';
import { MatDividerModule } from '@angular/material/divider';
import { MatLegacyPaginatorModule as MatPaginatorModule } from '@angular/material/legacy-paginator';


@NgModule({
  declarations: [WorkshopDetailComponent],
  exports: [WorkshopDetailComponent],
  imports: [
    CommonModule,
    RouterModule,
    WorkshopDetailRoutingModule,
    WorkshopViewerModule,
    MatDividerModule,
    MatPaginatorModule
  ]
})
export class WorkshopDetailModule { }
