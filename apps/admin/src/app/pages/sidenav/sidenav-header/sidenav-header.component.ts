import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export type SidenavHeaderData = {
  currentSection: {
    sectionTitle: string;
    headerSvgPath: string;
  };
  currentWorkshopTitle: string;
};
@Component({
  selector: 'ngx-sidenav-header',
  standalone: true,
  template: `
    <header class="primary-header sidenav-page-header">
      <img [src]="'/admin' + sidenavHeaderData.currentSection.headerSvgPath">
      <h1>{{sidenavHeaderData.currentSection.sectionTitle}}: {{sidenavHeaderData.currentWorkshopTitle}}</h1>
    </header>
  `,
  styles: [`
    .sidenav-page-header {
      display: flex;
      align-items: center;
      @media (max-width: 959px) {
        padding-left: 0;
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
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidenavHeaderComponent {
  @Input() sidenavHeaderData: SidenavHeaderData = {
    currentSection: { headerSvgPath: 'Default', sectionTitle: '/assets/img/dashboard-color.png' },
    currentWorkshopTitle: 'Default',
  };
}
