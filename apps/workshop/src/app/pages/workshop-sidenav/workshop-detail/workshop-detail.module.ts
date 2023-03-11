import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkshopDetailComponent } from './workshop-detail.component';
import { WorkshopViewerModule } from 'src/app/shared/components/workshop-viewer/workshop-viewer.module';
import { WorkshopDetailRoutingModule } from './workshop-detail-routing.module';
import { TableOfContentsModule } from 'src/app/shared/components/table-of-contents/table-of-contents.module';
import { MatLegacyPaginatorModule as MatPaginatorModule } from '@angular/material/legacy-paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';

@NgModule({
  declarations: [WorkshopDetailComponent],
  exports: [WorkshopDetailComponent],
  imports: [
    CommonModule,
    WorkshopDetailRoutingModule,
    WorkshopViewerModule,
    TableOfContentsModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class WorkshopDetailModule { }
