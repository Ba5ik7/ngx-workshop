import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
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
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    MatDividerModule,
  ],
  template: `
    <div class="workshop-menu-nav">
      <div class="toggle-wrapper">
        <div class="sidenav-toggle-desktop" (click)="toggleSideNavEmit()">
          @if(opened()) {
          <mat-icon>chevron_left</mat-icon>
          } @else {
          <mat-icon>chevron_right</mat-icon>
          }
        </div>
      </div>
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
        .toggle-wrapper {
          position: relative;
          @media (max-width: 786px) {
            display: none;
          }
          .sidenav-toggle-desktop {
            cursor: pointer;
            background-color: var(--mat-sys-primary);
            display: flex;
            align-items: center;
            height: 56px;
            position: absolute;
            top: -0.5px;
            left: 239.5px;
            box-sizing: border-box;
            border: 0.5px solid var(--mat-sys-primary-container);
            border-left: none;
            border-radius: 0 8px 8px 0;
            &.closed {
              left: 0px;
            }
          }
        }
        .workshop-menu-nav {
          color: var(--mat-sys-on-primary);
          background-color: var(--mat-sys-primary);
          position: sticky;
          top: 0;
          box-sizing: border-box;
          border: 0.5px solid var(--mat-sys-primary-container);
          border-left: none;
          .workshop-menu-nav-content {
            width: 240px;
            height: 100svh;
            overflow: auto;
            a {
              @include mat.list-overrides(
                (
                  list-item-label-text-color: var(--mat-sys-on-primary),
                  list-item-hover-label-text-color:
                    var(--mat-sys-primary-container),
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
})
export class SidenavMenuComponent {
  @Output() toggleSideNav = new EventEmitter<void>();
  @Input() sidenavMenuData: SidenavMenuData = {
    sections: {},
    workshops: [],
    signedIn: false,
  };

    opened = signal(true);

    toggleSideNavEmit() {
      this.toggleSideNav.emit();
      this.opened.set(!this.opened());
    }
}
