import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { ThemePickerModule } from 'src/app/shared/components/theme-picker/theme-picker.module';

@NgModule({
  declarations: [
    SettingsComponent
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    MatCardModule,
    ThemePickerModule
  ]
})
export class SettingsModule { }
