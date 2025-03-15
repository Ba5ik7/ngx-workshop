import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { UserStateService } from '../../services/user-state/user-state.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'ngx-profile-fab',
  imports: [
    CommonModule,
    MatButtonModule,
    RouterLink,
    MatIconModule,
    MatMenuModule,
  ],
  template: `
    <button mat-icon-button class="account-circle" [matMenuTriggerFor]="menu">
      <mat-icon>account_circle</mat-icon>
    </button>
    <mat-menu #menu xPosition="before">
      <button mat-menu-item routerLink="/sidenav/account">
        <mat-icon>manage_accounts</mat-icon>
        <span>Account</span>
      </button>
      <button mat-menu-item routerLink="/sidenav/settings">
        <mat-icon>settings</mat-icon>
        <span>Settings</span>
      </button>
      <button mat-menu-item (click)="signOut()">
        <mat-icon>logout</mat-icon>
        <span>Sign Out</span>
      </button>
    </mat-menu>
  `,
  styles: [
    `
      @use '@angular/material' as mat;
      :host {
        .account-circle {
          @include mat.icon-overrides(
            (
              color: var(--mat-sys-on-primary-container),
            )
          );
        }
      }
    `,
  ],
})
export class ProfileFabComponent {
  userStateService = inject(UserStateService);
  signOut(): void {
    this.userStateService.signOut();
  }
}
