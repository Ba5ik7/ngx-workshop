import { Component, inject, ViewEncapsulation } from '@angular/core';
import { combineLatest, map } from 'rxjs';
import { NavigationService } from '../../shared/services/navigation/navigation.service';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { SidenavMenuComponent } from './sidenav-menu/sidenav-menu.component';
import { SidenavHeaderComponent, SidenavHeaderData } from './sidenav-header/sidenav-header.component';


@Component({
  standalone: true,
  selector: 'ngx-sidenav',
  template: `
    <ng-container *ngIf="viewModel | async as vm; else loading">
      <mat-sidenav-container class="sidenav-container">
        <ngx-sidenav-header [sidenavHeaderData]="vm.sidenavHeaderData"></ngx-sidenav-header>
        <main class="sidenav-body-content">
          <ngx-sidenav-menu [sections]="vm.sections"></ngx-sidenav-menu>
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
      .workshop-menu-nav-content .mat-nav-list .mat-list-item .mat-list-item-content {
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

  sections = this.navigationService.getSections();
  currentSection = this.navigationService.getCurrentSection();
  currentWorkshopTitle = this.navigationService.getCurrentWorkshop()
  .pipe(map((workshop) => workshop?.name));

  viewModel = combineLatest({
    sections: this.sections,
    currentSection: this.currentSection,
    currentWorkshopTitle: this.currentWorkshopTitle,
  })
  .pipe(
    map(({ currentWorkshopTitle, currentSection, sections }) => {
      const { headerSvgPath, sectionTitle } = currentSection ?? {};
      return {
        sections,
        sidenavHeaderData: {
          headerSvgPath,
          sectionTitle,
          currentWorkshopTitle,
        } as SidenavHeaderData,
      };
    })
  );
}
