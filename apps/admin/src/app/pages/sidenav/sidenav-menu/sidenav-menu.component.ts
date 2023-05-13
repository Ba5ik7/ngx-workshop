import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { CreateSectionModalComponent } from './modals/create-section/create-section.component';
import { DeleteSectionModalComponent } from './modals/delete-section/delete-section-modal.component';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogModule } from '@angular/material/dialog';
import { Sections } from '../../../shared/interfaces/navigation.interface';
@Component({
  standalone: true,
  selector: 'ngx-sidenav-menu',
  template: `
    <div class="workshop-menu-nav">
      <div class="workshop-menu-nav-content">
        <mat-nav-list>
          <a mat-list-item routerLink="dashboard" routerLinkActive="workshop-menu-nav-item-selected" class="section-item">
            <span class="mat-list-item-content">  
            <mat-icon>dashboard</mat-icon>
              Dashboard
            </span>
          </a>
          <a mat-list-item routerLink="users" routerLinkActive="workshop-menu-nav-item-selected" class="section-item">
            <span class="mat-list-item-content">  
              <mat-icon>supervisor_account</mat-icon>
              Users
            </span>
          </a>
          <!-- <a mat-list-item routerLink="chat" routerLinkActive="workshop-menu-nav-item-selected" class="section-item">
            <span class="mat-list-item-content">
              <mat-icon>chat</mat-icon>
              Chat
            </span>
          </a> -->
          <mat-divider></mat-divider>
          <a mat-list-item (click)="createSection()" class="section-item">
            <span class="mat-list-item-content">
              <mat-icon class="create-icon" color="accent">note_add</mat-icon>
              Create Section
            </span>
          </a>
          <mat-divider></mat-divider>
          <a mat-list-item *ngFor="let section of sections | keyvalue"
              [routerLink]="'workshop-editor/' + section.value._id"
              routerLinkActive="workshop-menu-nav-item-selected"
              class="section-item">
            <!-- <img [src]="'/admin' + section.value.menuSvgPath"> -->
            <span class="mat-list-item-content">
              {{section.value.sectionTitle}}
              <div class="flex-spacer"></div>
              <mat-icon class="delete-icon" (click)="deleteSection($event, section.value)">delete</mat-icon>
            </span>
          </a>
        </mat-nav-list>
      </div>
    </div>
  `,
  styles: [`
    :host {
      .mat-icon {
        margin: 0 10px 3px 0;
        vertical-align: middle;
      }
      .mdc-list {
        padding: 0;
      }
      .section-item {
        opacity: .65;
        .mat-list-item-content {
          display: flex;
        }
        .delete-icon {
          margin: 0 0 0 10px;
          opacity: 0;
          &:hover {
            opacity: 1!important;
          }
        }
        &.workshop-menu-nav-item-selected {
          opacity: 1;
        }
        &:hover {
          opacity: 1;
          .delete-icon {
            opacity: 0.45;
          }
        }
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
    DeleteSectionModalComponent,
    CreateSectionModalComponent,
    MatDialogModule,
  ]
})
export class SidenavMenuComponent {
  // @TODO - Reactive
  @Input() sections!: Sections;

  constructor(public matDialog: MatDialog) { }

  deleteSection(event: Event, navItem: any): void {
    event.preventDefault();
    // EDIT: Looks like you also have to include Event#stopImmediatePropagation as well
    event.stopImmediatePropagation();
    this.matDialog.open(DeleteSectionModalComponent, { width: '400px', data: { navItem }});
  }

  createSection(): void {
    this.matDialog.open(CreateSectionModalComponent, { width: '500px' });
  }
}
