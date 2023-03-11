import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { AccountComponent } from './account.component';


@NgModule({
  declarations: [
    AccountComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    MatCardModule
  ]
})
export class AccountModule { }
