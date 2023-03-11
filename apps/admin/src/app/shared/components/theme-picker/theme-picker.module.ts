import { NgModule, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyMenuModule as MatMenuModule } from '@angular/material/legacy-menu';
import { MatLegacyTooltipModule as MatTooltipModule } from '@angular/material/legacy-tooltip';


import { ThemePickerComponent } from './theme-picker.component';
import { ThemePickerService } from './theme-picker.service';


@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatTooltipModule
  ],
  declarations: [ThemePickerComponent],
  exports: [ThemePickerComponent],
  providers: [ThemePickerService]
})
export class ThemePickerModule { }
