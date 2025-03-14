import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
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
  imports: [CommonModule, MatButtonModule, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header class="primary-header sidenav-page-header">
      <button mat-button class="sidenav-toggle" (click)="toggleSideNav.emit()">
        <mat-icon>menu</mat-icon>
      </button>
      <img [src]="sidenavHeaderData.headerSvgPath" />
      <h1>
        {{ sidenavHeaderData.sectionTitle }}:
        {{ sidenavHeaderData.currentWorkshopTitle }}
      </h1>
    </header>
  `,
  styles: [
    `
      .sidenav-page-header {
        display: flex;
        align-items: center;
        color: var(--mat-sys-on-primary-container);
        background-color: var(--mat-sys-primary-container);
        @media (max-width: 959px) {
          padding-left: 0;
        }
        .sidenav-toggle {
          display: none;
          mat-icon {
            font-size: 30px;
            height: 64px;
            width: 64px;
            line-height: 64px;
            margin: 0;
          }
          @media (max-width: 959px) {
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }
        h1 {
          font-weight: 300;
          @media (max-width: 959px) {
            padding: 24px 8px;
            font-size: 18px;
          }
        }
        img {
          width: 50px;
          margin: 0 10px;
          @media (max-width: 959px) {
            width: 35px;
            margin: 0;
          }
        }
      }
    `,
  ],
})
export class SidenavHeaderComponent {
  @Output() toggleSideNav = new EventEmitter<void>();
  @Input() sidenavHeaderData: SidenavHeaderData = {
    headerSvgPath: 'Default',
    sectionTitle: '/assets/img/dashboard-color.png',
    currentWorkshopTitle: 'Default',
  };
}
