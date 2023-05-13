import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { UserStateService } from '../../services/user-state/user-state.service';
import { ProfileFabComponent } from '../profile-fab/profile-fab.component';

@Component({
  standalone: true,
  selector: 'ngx-navbar',
  template: `
    <nav class="navbar-header mat-elevation-z6">
      <a mat-button routerLink="/">
        <mat-icon class="workshop-logo">admin_panel_settings</mat-icon>
        <span>Ngx-Admin</span>
      </a>
      <div class="flex-spacer"></div>
      <ngx-profile-fab *ngIf="userStateServices.signedIn$ | async"></ngx-profile-fab>
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
      padding: 4px 16px;
    }

    mat-icon.workshop-logo {
      font-size: 1.625rem;
      width: 26px;
      height: 26px;
      /* margin: 0 4px 3px 0; */
      vertical-align: middle;
    }
  `],
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    ProfileFabComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent {
  userStateServices = inject(UserStateService);
}
