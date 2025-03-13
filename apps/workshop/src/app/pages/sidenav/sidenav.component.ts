import { Component, inject, ViewChild, ViewEncapsulation } from '@angular/core';
import { combineLatest, map } from 'rxjs';
import { NavigationService } from '../../shared/services/navigation/navigation.service';
import { CommonModule } from '@angular/common';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import {
  SidenavMenuComponent,
  SidenavMenuData,
} from './sidenav-menu/sidenav-menu.component';
import {
  SidenavHeaderComponent,
  SidenavHeaderData,
} from './sidenav-header/sidenav-header.component';
import { UserStateService } from '../../shared/services/user-state/user-state.service';
import { BreakpointObserver } from '@angular/cdk/layout';

const EXTRA_SMALL_WIDTH_BREAKPOINT = 720;
const SMALL_WIDTH_BREAKPOINT = 959;

@Component({
  selector: 'ngx-sidenav',
  imports: [
    CommonModule,
    RouterModule,
    FooterComponent,
    MatSidenavModule,
    SidenavMenuComponent,
    SidenavHeaderComponent,
  ],
  encapsulation: ViewEncapsulation.None,
  template: `
    <ng-container *ngIf="viewModel | async as vm; else loading">
      <mat-sidenav-container>
        <mat-sidenav
          #sidenav
          class="workshop-sidenav"
          *ngIf="vm.isScreenSmall"
          [mode]="vm.isScreenSmall ? 'over' : 'side'"
          [fixedInViewport]="vm.isScreenSmall"
          [fixedTopGap]="vm.isExtraScreenSmall ? 92 : 56"
        >
          <ngx-sidenav-menu
            [sidenavMenuData]="vm.sidenavMenuData"
          ></ngx-sidenav-menu>
        </mat-sidenav>
        <ngx-sidenav-header
          [sidenavHeaderData]="vm.sidenavHeaderData"
          (toggleSideNav)="sidenav.toggle()"
        ></ngx-sidenav-header>
        <main class="sidenav-body-content">
          <ngx-sidenav-menu
            *ngIf="vm.isScreenSmall === false"
            [sidenavMenuData]="vm.sidenavMenuData"
          ></ngx-sidenav-menu>
          <router-outlet></router-outlet>
        </main>
        <ngx-footer></ngx-footer>
      </mat-sidenav-container>
    </ng-container>
    <ng-template #loading> loading... </ng-template>
  `,
  styles: [
    `
      ngx-sidenav {
        display: flex;
        flex-direction: column;
        overflow: auto;
      }
      .sidenav-body-content {
        display: flex;
        flex: 1 1 auto;
        background-color: var(--mat-sys-surface);
        @media (max-width: 959px) {
          min-height: 100vh;
        }
      }

      .sidenav-toggle {
        display: none;
        @media (max-width: 959px) {
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
    `,
  ],
})
export class SidenavComponent {
  breakpoints = inject(BreakpointObserver);
  navigationService = inject(NavigationService);

  @ViewChild('sidenav') sidenav!: MatSidenav;

  viewModel = combineLatest({
    signedIn: inject(UserStateService).signedIn$,
    workshops: this.navigationService.getWorkshops(),
    sections: this.navigationService.getSections(),
    currentSection: this.navigationService.getCurrentSection(),
    currentWorkshopTitle: this.navigationService
      .getCurrentWorkshop()
      .pipe(map((workshop) => workshop?.name)),
    isExtraScreenSmall: this.breakpoints
      .observe(`(max-width: ${EXTRA_SMALL_WIDTH_BREAKPOINT}px)`)
      .pipe(map((breakpoint) => breakpoint.matches)),
    isScreenSmall: this.breakpoints
      .observe(`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`)
      .pipe(map((breakpoint) => breakpoint.matches)),
  }).pipe(
    map(
      ({
        currentWorkshopTitle,
        currentSection,
        workshops,
        sections,
        signedIn,
        isExtraScreenSmall,
        isScreenSmall,
      }) => {
        const { headerSvgPath, sectionTitle } = currentSection ?? {};
        return {
          sidenavMenuData: {
            sections,
            workshops,
            signedIn,
          } as SidenavMenuData,
          sidenavHeaderData: {
            headerSvgPath,
            sectionTitle,
            currentWorkshopTitle,
          } as SidenavHeaderData,
          isExtraScreenSmall,
          isScreenSmall,
        };
      }
    )
  );
}
