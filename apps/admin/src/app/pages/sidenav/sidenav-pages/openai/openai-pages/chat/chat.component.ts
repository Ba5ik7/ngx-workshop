import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  QueryList,
  ViewChild,
  ViewChildren,
  inject,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { tap } from 'rxjs';
import { ChatService } from '../../../../../../shared/services/chat/chat.service';

@Component({
  selector: 'ngx-chat',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    RouterModule,
  ],
  template: `
    <ng-container *ngIf="chatAppData$ | async as data">
      <div class="messages-panel">
        <div class="message-container">
          <div *ngIf="data.chatRoom.messages.length > 0; else noMessages">
            <div *ngFor="let message of data.chatRoom.messages" #lastMessage>
              [{{ message.user }}]: {{ message.content }}
            </div>
          </div>
          <ng-template #noMessages><p>No messages in this room</p></ng-template>
        </div>
        <mat-form-field class="message sticky" color="accent">
          <mat-label>Message</mat-label>
          <textarea
            matInput
            color="accent"
            class="message-input"
            cdkTextareaAutosize
            cdkAutosizeMinRows="5"
            cdkAutosizeMaxRows="10"
            [(ngModel)]="message"
            (keyup.enter)="sendMessage()"
          ></textarea>
          <button mat-mini-fab color="accent" matSuffix>
            <mat-icon>send</mat-icon>
          </button>
        </mat-form-field>
      </div>
    </ng-container>
  `,
  styles: `
    ::ng-deep .message > .mat-mdc-form-field-subscript-wrapper {
      display: none;
    }
    .messages-panel {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .sticky {
      position: sticky;
      bottom: 0;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatComponent {
  @ViewChild('textArea') private textArea!: ElementRef;
  @ViewChildren('lastMessage') private messageElements!: QueryList<
    ElementRef<HTMLElement>
  >;

  chatService = inject(ChatService);
  message = '';
  user = '';

  chatAppData$ = this.chatService
    .getChatAppData()
    .pipe(tap(() => this.scrollToBottom()));

  switchRoom(room: string) {
    this.chatService.switchRoom(room);
  }

  sendMessage() {
    if (this.message) {
      this.chatService.sendMessage(this.message);
      this.message = '';
    }
  }

  scrollToBottom() {
    requestAnimationFrame(() => {
      this.messageElements.last?.nativeElement.scrollIntoView({
        behavior: 'smooth',
        inline: 'nearest',
      });
    });
  }
}
