import { Component, inject, OnDestroy, ViewChild, ViewEncapsulation } from '@angular/core';
import { combineLatest, map, tap } from 'rxjs';
import { NavigationService } from '../../shared/services/navigation/navigation.service';
import { CommonModule } from '@angular/common';
import { MatSidenavContent, MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { SidenavMenuComponent } from './sidenav-menu/sidenav-menu.component';
import { SidenavHeaderComponent, SidenavHeaderData } from './sidenav-header/sidenav-header.component';
import { ScrollService } from '../../shared/services/scroll/scroll.service';

// setTimeout(() => {
//   document.querySelectorAll('*').forEach((el) => {
//     el.addEventListener('scroll', (e) => {
//       console.log('Scrolling element:', e.target);
//     });
//   });
// }, 2000);

@Component({
  standalone: true,
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
      <mat-sidenav-container class="sidenav-container">
        <mat-sidenav-content #matSidenavContent>
          <ngx-sidenav-header [sidenavHeaderData]="vm.sidenavHeaderData"></ngx-sidenav-header>
          <main class="sidenav-body-content">
            <ngx-sidenav-menu [sections]="vm.sections"></ngx-sidenav-menu>
            <router-outlet></router-outlet>
          </main>
          <!-- <ngx-footer></ngx-footer> -->
        </mat-sidenav-content>
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
  `]
})
export class SidenavComponent implements OnDestroy {
  @ViewChild('matSidenavContent') matSidenavContent!: MatSidenavContent;

  navigationService = inject(NavigationService);
  scrollService = inject(ScrollService);
  
  viewModel = combineLatest({
    sections: this.navigationService.getSections(),
    currentSection: this.navigationService.getCurrentSection(),
    currentWorkshopTitle: this.navigationService.getCurrentWorkshop()
                            .pipe(map((workshop) => workshop?.name))
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
    }),
    tap(() => {
      requestAnimationFrame(() => {
        this.scrollService.attachScrollListener(this.matSidenavContent['elementRef']);
      });
    })
  );

  ngOnDestroy() {
    this.scrollService.detachScrollListener(this.matSidenavContent['elementRef']);
  }
}
