import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar.component';
import { ThemePickerModule } from '../theme-picker/theme-picker.module';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { ProfileFabModule } from '../profile-fab/profile-fab.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ThemePickerModule,
    MatButtonModule,
    MatIconModule,
    ProfileFabModule
  ],
  declarations: [NavbarComponent],
  exports: [NavbarComponent]
})
export class NavbarModule { }
