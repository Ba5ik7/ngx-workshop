import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkshopMenuComponent } from './workshop-menu.component';
import { MatLegacyListModule as MatListModule } from '@angular/material/legacy-list';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [WorkshopMenuComponent],
  exports: [WorkshopMenuComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatListModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class WorkshopMenuModule { }
