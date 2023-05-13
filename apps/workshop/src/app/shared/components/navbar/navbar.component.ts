import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { UserStateService } from '../../services/user-state/user-state.service';
import { ProfileFabComponent } from '../profile-fab/profile-fab.component';
import { combineLatest, map } from 'rxjs';
import { NavigationService } from '../../services/navigation/navigation.service';
import { ThemePickerComponent } from '../theme-picker/theme-picker.component';

@Component({
  standalone: true,
  selector: 'ngx-navbar',
  template: `
    <ng-container *ngIf="viewModel$ | async as mv; else loading">
      <nav class="navbar-header mat-elevation-z6">
        <a mat-button routerLink="/">
          <mat-icon class="workshop-logo">tips_and_updates</mat-icon>
          <span>Ngx-Workshop</span>
        </a>
        <a mat-button class="docs-navbar-hide-small docs-button"
            *ngFor="let section of mv.sections | keyvalue;"
            [routerLink]="'/sidenav/workshops/' + section.key"
            routerLinkActive="navbar-menu-item-selected">
          <img mat-fab-image class="section-logo" [src]="section.value.menuSvgPath">
          <span>{{section.value.sectionTitle}}</span>
        </a>
        <div class="flex-spacer"></div>
        <ng-container *ngIf="mv.signedIn; else authentication">
          <ngx-profile-fab></ngx-profile-fab>
        </ng-container>
        <ng-template #authentication>
          <ngx-theme-picker></ngx-theme-picker>
          <a mat-button (click)="mv.openDialog()">Sign In</a>
        </ng-template>
      </nav>
      <nav class="docs-navbar docs-navbar-show-small" aria-label="Section Nav Bar">
        <a mat-button class="docs-navbar-link"
            *ngFor="let section of mv.sections | keyvalue;"
            [routerLink]="'/sidenav/workshops/' +section.key"
            routerLinkActive="navbar-menu-item-selected">
            <img mat-fab-image class="section-logo" [src]="section.value.menuSvgPath">
          <span>{{section.value.sectionTitle}}</span>
        </a>
      </nav>
    </ng-container>
    <ng-template #loading>
      LOADING...
    </ng-template>
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
      vertical-align: middle;
    }
    .section-logo {
      width: 24px;
      height: 24px;
      margin: 0 8px 4px 0;
      vertical-align: middle;
    }
    .docs-navbar { display: none; }
    .docs-navbar-show-small { display: none; }
    @media (max-width: 720px) {
      .docs-navbar-hide-small {
        display: none;
      }
      .docs-navbar-show-small {
        display: block;
      }
      .docs-navbar {
        display: flex;
      }
    }

    theme-picker {
      display: none;
      @media (min-width: 328px) {
        display: block;
      }
    }
  `],
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    ProfileFabComponent,
    ThemePickerComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent {
  userStateService = inject(UserStateService);
  navigationService = inject(NavigationService);

  viewModel$ = combineLatest({
    sections: this.navigationService.getSections(),
    signedIn: this.userStateService.signedIn$
  }).pipe(
    map(({ sections, signedIn }) => ({ 
      sections,
      signedIn,
      openDialog: () => this.userStateService.openSignInModal.next(true)
    }))
  );
}
