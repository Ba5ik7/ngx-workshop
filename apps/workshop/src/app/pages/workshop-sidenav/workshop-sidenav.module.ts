import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkshopSidenavRoutingModule } from './workshop-sidenav-routing.module';
import { WorkshopSidenavComponent } from './workshop-sidenav.component';

import { FooterModule } from '../../shared/components/footer/footer.module';

import { MatIconModule } from '@angular/material/icon';
import { MatLegacyListModule as MatListModule } from '@angular/material/legacy-list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { WorkshopMenuModule } from './workshop-menu/workshop-menu.module';


@NgModule({
  declarations: [
    WorkshopSidenavComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    WorkshopSidenavRoutingModule,
    WorkshopMenuModule,
    FooterModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule
  ]
})
export class WorkshopSidenavModule { }
