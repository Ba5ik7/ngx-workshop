import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { ChatService } from '../../../../shared/services/chat/chat.service';

@Component({
    selector: 'ngx-chat',
    imports: [CommonModule, RouterModule, MatListModule],
    template: `
    <div class="main-content">
      <router-outlet></router-outlet>
    </div>
    <div class="rooms-list-panel">
      <div class="rooms">
        <mat-nav-list>
          <div mat-list-item><h1>Chatrooms</h1></div>
          <mat-divider></mat-divider>
          @if (rooms$ | async; as rooms) {
            @for (room of rooms; track $index) {
              <a mat-list-item
              (click)="switchRoom(room.roomName)"
              [routerLink]="'./' + room.roomName"
              routerLinkActive="workshop-menu-nav-item-selected">
              {{ room.roomName }}
              </a>
            }
          }
        </mat-nav-list>
        <mat-nav-list>
          <div mat-list-item><h1>Open AI</h1></div>
          <mat-divider></mat-divider>
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

    .rooms h1 {
      font-weight: 100;
      margin-left: 10px;
      margin-bottom: 8px;
    }
  `]
})
export class OpenaiComponent {
  chatService = inject(ChatService);
  
  rooms$ = this.chatService.fetchChatrooms();

  switchRoom(room: string) {
    this.chatService.switchRoom(room);
  }
}
