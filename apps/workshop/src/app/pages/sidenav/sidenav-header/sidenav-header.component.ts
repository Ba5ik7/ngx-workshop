import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

export type SidenavHeaderData = {
  sectionTitle: string;
  headerSvgPath: string;
  currentWorkshopTitle: string;
};
@Component({
  selector: 'ngx-sidenav-header',
  standalone: true,
  template: `
    <header class="primary-header sidenav-page-header">
      <button mat-button class="sidenav-toggle" (click)="toggleSideNav.emit()">
        <mat-icon>menu</mat-icon>
      </button>
      <img [src]="'/admin' + sidenavHeaderData.headerSvgPath">
      <h1>{{sidenavHeaderData.sectionTitle}}: {{sidenavHeaderData.currentWorkshopTitle}}</h1>
    </header>
  `,
  styles: [`
    .sidenav-page-header {
      display: flex;
      align-items: center;
      @media (max-width: 959px) {
        padding-left: 0;
      }
      .sidenav-toggle {
        margin: 0;
        mat-icon {
          font-size: 30px;
          height: 64px;
          width: 64px;
          line-height: 64px;
        }
      }
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
    }
  `],
  imports: [CommonModule, MatButtonModule, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidenavHeaderComponent {
  @Output() toggleSideNav = new EventEmitter<void>();
  @Input() sidenavHeaderData: SidenavHeaderData = {
    headerSvgPath: 'Default',
    sectionTitle: '/assets/img/dashboard-color.png',
    currentWorkshopTitle: 'Default',
  };
}
