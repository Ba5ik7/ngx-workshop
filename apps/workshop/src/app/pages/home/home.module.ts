import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { FooterComponent } from '../../shared/components/footer/footer.component';


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FooterComponent,
    MatButtonModule
  ]
})
export class HomeModule { }
