import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { RouterModule } from '@angular/router';
import { ThemePickerComponent } from '../theme-picker/theme-picker.component';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ThemePickerComponent,
    MatButtonModule,
    MatIconModule
  ],
  selector: 'ngx-navbar',
  template: `
    <nav class="navbar-header">
      <a mat-button routerLink="/">
        <mat-icon class="workshop-logo">admin_panel_settings</mat-icon>
        <span>Ngx-Admin</span>
      </a>
      <div class="flex-spacer"></div>
      <ngx-theme-picker></ngx-theme-picker>
      <a mat-button href="https://github.com/Ba5ik7/workshop-viewer" target="_blank">
        <img class="workshop-logo"
            src="/admin/assets/img/github-circle-white-transparent.svg"
            alt="github">
        GitHub
      </a>
    </nav>
  `,
  styles: [`
    :host {
      position: fixed;
      left: 0;
      right: 0;
      z-index: 2;
    }

    .navbar-header {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      padding: 8px 16px;
    }

    .workshop-logo {
      height: 26px;
      margin: 0 4px 3px 0;
      vertical-align: middle;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent { }