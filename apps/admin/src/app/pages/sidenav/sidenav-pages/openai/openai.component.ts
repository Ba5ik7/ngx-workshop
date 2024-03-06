import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'ngx-chat',
  imports: [CommonModule, RouterModule, MatListModule],
  template: `
    <div class="main-content">
      <router-outlet></router-outlet>
    </div>
    <div class="rooms-list-panel">
      <div class="rooms">
        <mat-nav-list>
          <div mat-list-item><h1>Open AI</h1></div>
          <mat-divider></mat-divider>
          <a mat-list-item
            routerLink="chat"
            routerLinkActive="workshop-menu-nav-item-selected">
            Chat
          </a>
          <a mat-list-item
            routerLink="history"
            routerLinkActive="workshop-menu-nav-item-selected">
            History
          </a>
          <a mat-list-item
            routerLink="workshop-creator"
            routerLinkActive="workshop-menu-nav-item-selected">
            Workshop Creator
          </a>
        </mat-nav-list>
      </div>
    </div>
  `,
  styles: [`
    :host {
      grid-template-columns: calc(100vw - 558px) auto;
      display: grid;
    }

    .rooms-list-panel {
      position: sticky;
      top: 0;
      height: calc(100vh - 56px);
      width: 315px;
    }
  `]
})
export class OpenaiComponent {

}
