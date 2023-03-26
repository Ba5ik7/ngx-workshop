import { Component, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
import { NavigationService } from '../../shared/services/navigation/navigation.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyListModule as MatListModule } from '@angular/material/legacy-list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { WorkshopMenuModule } from './sidenav-menu/sidenav-menu.module';
import { FooterComponent } from '../../shared/components/footer/footer.component';


@Component({
  standalone: true,
  selector: 'ngx-sidenav',
  template: `
    <mat-sidenav-container class="sidenav-container">
      <header class="primary-header sidenav-page-header">
        <img *ngIf="headerSvgPath | async"
          [src]="'/admin' + (headerSvgPath | async)">
        <h1>{{sectionTitle | async}}: {{categoryTitle | async}}</h1>
      </header>
      <main class="sidenav-body-content">
        <ngx-sidenav-menu [sections]="sections | async"></ngx-sidenav-menu>
        <router-outlet></router-outlet>
      </main>
      <ngx-footer></ngx-footer>
    </mat-sidenav-container>
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

    .sidenav-page-header {
      display: flex;
      align-items: center;

      h1 {
        font-weight: 300;
        margin: 0;
        padding: 28px 8px;

        @media (max-width: 959px) {
          padding: 24px 8px;
          font-size: 20px;
        }
      }

      img {
        width: 50px;
        margin: 0 10px;
      }

      @media (max-width: 959px) {
        padding-left: 0;
      }
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
    WorkshopMenuModule,
    FooterComponent,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule
  ],
  encapsulation: ViewEncapsulation.None
})
export class SidenavComponent {

  sections!: Observable<any[]>;
  sectionTitle!: Observable<string>;
  categoryTitle!: Observable<string>;
  headerSvgPath!: Observable<string>;


  constructor(navigationService: NavigationService) {
    this.sections = navigationService.sections$;
    this.sectionTitle = navigationService.sectionTitle$;
    this.headerSvgPath = navigationService.headerSvgPath$;
    this.categoryTitle = navigationService.categoryTitle$;
  }
}
