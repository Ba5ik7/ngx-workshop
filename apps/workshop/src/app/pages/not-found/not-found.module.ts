import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotFoundRoutingModule } from './not-found-routing.module';
import { NotFoundComponent } from './not-found.component';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { FooterComponent } from '../../shared/components/footer/footer.component';


@NgModule({
  declarations: [
    NotFoundComponent
  ],
  imports: [
    CommonModule,
    NotFoundRoutingModule,
    MatButtonModule,
    FooterComponent
  ]
})
export class NotFoundModule { }
