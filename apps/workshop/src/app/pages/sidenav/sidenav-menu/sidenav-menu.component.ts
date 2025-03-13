import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import {
  Sections,
  Workshop,
} from '../../../shared/interfaces/navigation.interface';

export type SidenavMenuData = {
  sections: Sections;
  workshops: Workshop[];
  signedIn: boolean;
};
@Component({
  selector: 'ngx-sidenav-menu',
  template: `
    <div class="workshop-menu-nav">
      <div class="workshop-menu-nav-content">
        <mat-nav-list>
          <ng-container *ngIf="sidenavMenuData.signedIn">
            <a
              mat-list-item
              class="workshop-item"
              routerLink="dashboard"
              routerLinkActive="workshop-menu-nav-item-selected"
            >
              <mat-icon>dashboard</mat-icon>
              Dashboard
            </a>
            <mat-divider></mat-divider>
          </ng-container>
          <ng-container
            *ngIf="sidenavMenuData.workshops.length > 0; else elseTemplate"
          >
            <a
              mat-list-item
              *ngFor="let workshop of sidenavMenuData.workshops"
              [routerLink]="
                './workshops/' +
                workshop.sectionId +
                '/' +
                workshop.workshopDocumentGroupId +
                '/' +
                workshop.workshopDocuments[0]._id
              "
              routerLinkActive="workshop-menu-nav-item-selected"
              class="workshop-item"
            >
              {{ workshop.name }}
            </a>
          </ng-container>
          <ng-template #elseTemplate>
            <a
              mat-list-item
              *ngFor="let section of sidenavMenuData.sections | keyvalue"
              [routerLink]="'/sidenav/workshops/' + section.key"
              routerLinkActive="workshop-menu-nav-item-selected"
              class="workshop-item"
            >
              {{ section.value.sectionTitle }}
            </a>
          </ng-template>
        </mat-nav-list>
      </div>
    </div>
  `,
  styles: [
    `
      @use '@angular/material' as mat;

      :host {
        .workshop-menu-nav {
          color: var(--mat-sys-on-primary);
          background-color: var(--mat-sys-primary);
          position: sticky;
          top: 0;
          .workshop-menu-nav-content {
            width: 240px;
            height: 100svh;
            overflow: auto;

            a {
              @include mat.list-overrides(
                (
                  list-item-label-text-color: var(--mat-sys-on-primary),
                  list-item-hover-label-text-color: var(--mat-sys-primary-container)
                )
              );
            }
            &::-webkit-scrollbar {
              height: 4px;
              width: 4px;
            }
          }
        }
      }
    `,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    MatDividerModule,
  ],
})
export class SidenavMenuComponent {
  @Input() sidenavMenuData: SidenavMenuData = {
    sections: {},
    workshops: [],
    signedIn: false,
  };
}
