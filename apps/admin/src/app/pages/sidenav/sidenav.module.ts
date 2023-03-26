import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkshopSidenavRoutingModule } from './sidenav-routing.module';
import { SidenavComponent } from './sidenav.component';

import { MatIconModule } from '@angular/material/icon';
import { MatLegacyListModule as MatListModule } from '@angular/material/legacy-list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { WorkshopMenuModule } from './workshop-menu/workshop-menu.module';
import { FooterComponent } from '../../shared/components/footer/footer.component';


@NgModule({
  declarations: [
    SidenavComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    WorkshopSidenavRoutingModule,
    WorkshopMenuModule,
    FooterComponent,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule
  ]
})
export class WorkshopSidenavModule { }
