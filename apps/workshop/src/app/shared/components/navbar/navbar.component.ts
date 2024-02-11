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
      <nav class="navbar-header mat-elevation-z6 docs-navbar-hide-small">
        <a routerLink="/" class="workshop-logo docs-button">
          <mat-icon>tips_and_updates</mat-icon>
          <p>Ngx-Workshop</p>
        </a>
        <a class="docs-button"
            *ngFor="let section of mv.sections | keyvalue;"
            [routerLink]="'/sidenav/workshops/' + section.key"
            routerLinkActive="navbar-menu-item-selected">
          <img mat-fab-image class="section-logo" [src]="section.value.menuSvgPath">
          <p>{{section.value.sectionTitle}}</p>
        </a>
        <div class="flex-spacer"></div>
        <ng-container *ngIf="mv.signedIn; else authentication">
          <ngx-profile-fab></ngx-profile-fab>
        </ng-container>
        <ng-template #authentication>
          <ngx-theme-picker></ngx-theme-picker>
          <a (click)="mv.openDialog()">Sign In</a>
        </ng-template>
      </nav>

      <nav class="navbar-header-mobile mat-elevation-z6">
        <a mat-button routerLink="/">
          <mat-icon class="workshop-logo-mobile">tips_and_updates</mat-icon>
          <span>Ngx-Workshop</span>
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
        <a mat-button *ngFor="let section of mv.sections | keyvalue;"
            [routerLink]="'/sidenav/workshops/' +section.key"
            routerLinkActive="navbar-menu-item-selected">
            <img mat-fab-image class="section-logo-mobile" [src]="section.value.menuSvgPath">
          {{section.value.sectionTitle}}
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
      width: 110px;
      height: 100svh;
      flex-wrap: wrap;
      align-items: center;
      flex-direction: column;

    .docs-button {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: .75rem;
        padding-block: 1.25rem;
        text-decoration: none;
        fill: var(--quaternary-contrast);
        color: inherit;
        cursor: pointer;
        transition: fill .3s ease;
      }
    }

    .workshop-logo {
      font-weight: 100;
      mat-icon {
        font-size: 3.18rem;
        width: 50px;
        height: 50px;
        vertical-align: middle;
      }
    }
    .section-logo {
      width: 24px;
      height: 24px;
    }

    .navbar-header-mobile {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      padding: 4px 16px;
    }

    mat-icon.workshop-logo-mobile {
      font-size: 1.625rem;
      width: 26px;
      height: 26px;
      vertical-align: middle;
    }

    .section-logo-mobile {
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
        justify-content: space-around;
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
