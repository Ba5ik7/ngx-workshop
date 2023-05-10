import { Component, inject, ViewEncapsulation } from '@angular/core';
import { combineLatest, map } from 'rxjs';
import { NavigationService } from '../../shared/services/navigation/navigation.service';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { SidenavMenuComponent, SidenavMenuData } from './sidenav-menu/sidenav-menu.component';
import { SidenavHeaderComponent, SidenavHeaderData } from './sidenav-header/sidenav-header.component';
import { UserStateService } from '../../shared/services/user-state/user-state.service';


@Component({
  standalone: true,
  selector: 'ngx-sidenav',
  template: `
    <ng-container *ngIf="viewModel | async as vm; else loading">
      <mat-sidenav-container class="sidenav-container">
        <ngx-sidenav-header [sidenavHeaderData]="vm.sidenavHeaderData"></ngx-sidenav-header>
        <main class="sidenav-body-content">
          <ngx-sidenav-menu [vm]="vm.sidenavMenuData"></ngx-sidenav-menu>
          <router-outlet></router-outlet>
        </main>
        <ngx-footer></ngx-footer>
      </mat-sidenav-container>
    </ng-container>
    <ng-template #loading>
        loading...
    </ng-template>
  `,
  styles: [`
    ngx-sidenav {
      display: flex;
      flex-direction: column;
      overflow: auto;
    }
    .sidenav-body-content {
      display: flex;
      flex: 1 1 auto;
    }
    .sidenav-toggle {
      padding: 0;
      margin: 8px;
      min-width: 64px;
      display: none;
      @media (max-width: 959px) {
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
    .workshop-menu-nav {
      position: sticky;
      top: 0;
      .workshop-menu-nav-content {
        width: 240px;
        height: calc(100vh - 56px);
        overflow: auto;

        &::-webkit-scrollbar {
          height: 4px;
          width: 4px;
        }
      }
      /* TODO(mdc-migration): The following rule targets internal classes of list that may no longer apply for the MDC version. */
      .workshop-menu-nav-content .mat-nav-list .mat-mdc-list-item .mat-list-item-content {
        padding-left: 25px;
      }
    }
  `],
  imports: [
    CommonModule,
    RouterModule,
    FooterComponent,
    MatSidenavModule,
    SidenavMenuComponent,
    SidenavHeaderComponent,
  ],
  encapsulation: ViewEncapsulation.None
})
export class SidenavComponent {
  navigationService = inject(NavigationService);
  viewModel = combineLatest({
    signedIn: inject(UserStateService).signedIn$,
    workshops: this.navigationService.getWorkshops(),
    sections: this.navigationService.getSections(),
    currentSection: this.navigationService.getCurrentSection(),
    currentWorkshopTitle: this.navigationService.getCurrentWorkshop()
                            .pipe(map((workshop) => workshop?.name))
  })
  .pipe(
    map(({
      currentWorkshopTitle,
      currentSection,
      workshops,
      sections,
      signedIn
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
      };
    })
  );
}
