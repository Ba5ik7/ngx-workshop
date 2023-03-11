import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkshopViewerComponent } from './workshop-viewer.component';
import { WorkshopViewerService } from './workshop-viewer.service';
// import { LiveExampleComponent } from './live-example/live-example.component';
// import { NextPageComponent } from './next-page/next-page.component';
import { MatIconModule } from '@angular/material/icon';
import { NgxEditorjsClientModule } from '@tmdjr/ngx-editorjs-client';



@NgModule({
  declarations: [
    WorkshopViewerComponent,
    // LiveExampleComponent,
    // NextPageComponent
  ],
  exports: [WorkshopViewerComponent],
  imports: [
    CommonModule,
    MatIconModule,
    NgxEditorjsClientModule
  ],
  providers: [WorkshopViewerService]
})
export class WorkshopViewerModule { }
