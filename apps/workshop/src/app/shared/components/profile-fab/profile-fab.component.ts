import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UserStateService } from '../../services/user-state/user-state.service';
import { AuthenticationService } from '../sign-in-modal/authentication.service';

@Component({
  selector: 'profile-fab',
  template: `<button mat-icon-button color="accent" [matMenuTriggerFor]="menu">
  <mat-icon>account_circle</mat-icon>
</button>
<mat-menu #menu xPosition="before">
<button mat-menu-item routerLink="/account">
  <mat-icon>manage_accounts</mat-icon>
    <span>Account</span>
  </button>
  <button mat-menu-item routerLink="/settings">
    <mat-icon>settings</mat-icon>
    <span>Settings</span>
  </button>
  <button mat-menu-item (click)="signOut()">
    <mat-icon>logout</mat-icon>
    <span>Sign Out</span>
  </button>
</mat-menu>`,
  styleUrls: ['./profile-fab.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ProfileFabComponent {

  constructor(private userStateService: UserStateService) { }

  signOut(): void {
    this.userStateService.signOut();
  }
}
