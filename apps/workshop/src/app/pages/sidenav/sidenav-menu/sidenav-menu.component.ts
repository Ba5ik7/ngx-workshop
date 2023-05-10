import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { Sections, Workshop } from '../../../shared/interfaces/navigation.interface';

export type SidenavMenuData = {
  sections: Sections,
  workshops: Workshop[],
  signedIn: boolean,
};
@Component({
  standalone: true,
  selector: 'ngx-sidenav-menu',
  template: `
    <div class="workshop-menu-nav">
      <div class="workshop-menu-nav-content">
        <mat-nav-list>
          <ng-container *ngIf="vm.signedIn">
            <a mat-list-item routerLink="dashboard" routerLinkActive="workshop-menu-nav-item-selected">
              <mat-icon>dashboard</mat-icon>
              Dashboard
            </a>
            <mat-divider></mat-divider>
          </ng-container>
          <ng-container *ngIf="vm.workshops.length > 0; else elseTemplate">
            <a mat-list-item *ngFor="let workshop of vm.workshops"
                [routerLink]="'./workshops/' + workshop.sectionId + '/' + workshop.workshopDocumentGroupId + '/' + workshop.workshopDocuments[0]._id"
                routerLinkActive="workshop-menu-nav-item-selected"
                class="workshop-item">
              {{workshop.name}}
            </a>
          </ng-container>
          <ng-template #elseTemplate>
            <a mat-list-item *ngFor="let section of vm.sections | keyvalue;"
                [routerLink]="'/sidenav/workshops/' + section.key"
                routerLinkActive="workshop-menu-nav-item-selected"
                class="workshop-item">
              {{section.value.sectionTitle}}
            </a>
          </ng-template>
        </mat-nav-list>
      </div>
    </div>
  `,
  styles: [`
    :host {
      mat-icon {
        margin: 0 10px 3px 0;
        vertical-align: middle;
      }
    }
  `],
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    MatDividerModule,
  ]
})
export class SidenavMenuComponent {
  @Input() vm: SidenavMenuData = {
    sections: {},
    workshops: [],
    signedIn: false,
  };
}
