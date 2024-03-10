import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Observable } from 'rxjs';

import { RouterModule } from '@angular/router';
import { ChatAppData, ChatService } from '../../../../shared/services/chat/chat.service';

@Component({
  standalone: true,
  selector: 'ngx-chat',
  template: `
  <ng-container *ngIf="chatAppData$ | async as data">
    <div class="messages-panel">
      <div class="messages">
        <div *ngIf="data.chatRoom.messages.length > 0; else noMessages">
          <ul>
            <li *ngFor="let message of data.chatRoom.messages">
              [{{ message.user }}]: {{ message.content }}
            </li>
          </ul>
        </div>
        <ng-template #noMessages><p>No messages in this room</p></ng-template>
      </div>
        <mat-form-field class="message sticky" color="accent">
          <mat-label>Message</mat-label>
          <input matInput color="accent"
            [(ngModel)]="message"
            (keyup.enter)="sendMessage()" />
          <button mat-mini-fab color="accent" matSuffix>
            <mat-icon>send</mat-icon>
          </button>
        </mat-form-field>
    </div>
    <div class="rooms-list-panel">
      <div class="rooms">
        <mat-nav-list>
          <a mat-list-item>Rooms</a>
          <mat-divider></mat-divider>
          <a mat-list-item *ngFor="let room of data.rooms"
            (click)="switchRoom(room)"
            [routerLink]="'../' + room"
            routerLinkActive="workshop-menu-nav-item-selected">
            {{room}}
          </a>
        </mat-nav-list>
      </div>
    </div>
  </ng-container>
  `,
  styles: [`
    :host {
      grid-template-columns: calc(100vw - 558px) auto;
      display: grid;
    }

    /* TODO(mdc-migration): The following rule targets internal classes of form-field that may no longer apply for the MDC version. */
    ::ng-deep .message > .mat-form-field-wrapper {
      margin-bottom: -1.25em;
    }

    /* TODO(mdc-migration): The following rule targets internal classes of form-field that may no longer apply for the MDC version. */
    ::ng-deep .message .mat-form-field-flex {
      align-items: center;
      gap: 10px;
      padding: .75em!important;
    }
    .rooms-list-panel {
      position: sticky;
      top: 0;
      height: calc(100vh - 56px);
      width: 315px;
    }

    .messages-panel {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    .sticky {
      position: sticky;
      bottom: 0;
    }
  `],
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatListModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    RouterModule
  ]
})
export class ChatComponent implements OnInit {
  chatService = inject(ChatService);

  message = '';
  user = '';
  chatAppData$!: Observable<ChatAppData>;

  ngOnInit(): void {
    this.chatAppData$ = this.chatService.getChatAppData();
  }

  switchRoom(room: string) {
    this.chatService.switchRoom(room);
  }

  sendMessage() {
    if (this.message) {
      // this.chatService.sendMessage(this.message);
      this.message = '';
    }
  }
}
