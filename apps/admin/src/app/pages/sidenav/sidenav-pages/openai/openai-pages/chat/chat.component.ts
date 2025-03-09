import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChildren,
  inject,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Subject, combineLatest, map, of, switchMap, take, takeUntil, tap } from 'rxjs';
import { MarkdownService } from 'ngx-markdown';
import { ChatService } from '../../../../../../shared/services/chat/chat.service';
import { UserStateService } from '../../../../../../shared/services/user-state/user-state.service';
import { SpeechService } from '../../../../../../shared/services/speech/speech.service';
import { ScrollService } from '../../../../../../shared/services/scroll/scroll.service';

@Component({
    selector: 'ngx-chat',
    imports: [
        CommonModule,
        FormsModule,
        MatIconModule,
        MatInputModule,
        MatFormFieldModule,
        MatIconModule,
        RouterModule,
    ],
    template: `
    <ng-container *ngIf="viewModel$ | async as vm">
      <div class="messages-panel" >
        <div class="messages-container" >
          @if (vm.messages.length > 0) {
            <div
              #lastMessage
              class="message-box mat-mdc-card"
              *ngFor="let message of vm.messages"
              [ngClass]="{'me': message.user === user}">
                <div class="message-header">
                  <div class="message-user">
                    {{ message.user }}
                  </div>
                  <div class="message-time">{{ message.timestamp | date:'medium' }}</div>
                </div>
                <div class="message" [innerHTML]="message.content"></div>
                <a
                  color="accent"
                  class="message-speak"
                  (click)="onConvertTextToSpeech(message.contentRaw)"
                >
                  <mat-icon>volume_up</mat-icon>
                </a>
            </div>
          } @else {
            <p>No messages in this room</p>
          }
        </div>
        <mat-form-field class="message sticky" color="accent">
          <mat-label>Message</mat-label>
          <textarea
            matInput
            color="accent"
            class="message-input"
            cdkTextareaAutosize
            cdkAutosizeMinRows="3"
            cdkAutosizeMaxRows="10"
            [(ngModel)]="message"
            (keyup.enter)="sendMessage()"
          ></textarea>
        </mat-form-field>
      </div>
    </ng-container>
  `,
    styles: `
    @use '@angular/material' as mat;
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

    .messages-container {
      display: flex;
      flex-direction: column;
      .message-box {
        @include mat.elevation(4);
        padding: 10px;
        margin: 10px;
        border-radius: 10px;
        width: 70%;
        &.me {
          align-self: end;
        }
        .message-header {
          display: flex;
          align-items: baseline;
          gap: 6px;
          font-size: 0.8rem;
          font-weight: 100;
          margin-bottom: 5px;
          .message-time {
            font-size: 0.6rem;
          }
        }
      }
    }
  `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatComponent implements OnInit, OnDestroy {
  @ViewChildren('lastMessage') private messageElements!: QueryList<
    ElementRef<HTMLElement>
  >;

  route = inject(ActivatedRoute);
  chatService = inject(ChatService);
  markdownService = inject(MarkdownService);
  speechService = inject(SpeechService);
  scrollService = inject(ScrollService);

  onDestroy$ = new Subject();
  user = 'anonymous';
  message = '';
  offset = 0;
  
  viewModel$ = combineLatest([
    of(this.route.snapshot.paramMap.get('chatRoom')),
    inject(UserStateService).userMetadata$,
  ]).pipe(
    tap(([room, userMetadata]) => {
      this.user = userMetadata?.email ?? 'anonymous';
      this.chatService.switchRoom(room ?? 'Angular');
    }),
    switchMap(() => this.chatService.getChatAppData()),
    map((data) => ({ 
      messages: data.chatRoom.messages.map((message) => ({
        ...message,
        content: this.markdownService.parse(message.content) as string,
        contentRaw: message.content,
      })),
    })),
    tap(({ messages }) => this.offset = messages.length),
    tap(() => this.scrollToBottom())
  );

  sendMessage() {
    if (this.message) {
      this.chatService.sendMessage(this.message, /^\/ai/.test(this.message));
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
  
  onScroll(event: Event) {
    const scrollTop = (event.target as HTMLElement)?.scrollTop;
    if (scrollTop === 0) { // Reached the top of the messages container
      this.loadMoreMessages();
    }
  }

  loadMoreMessages() {
    this.chatService.fetchMoreMessages(this.offset)
      .pipe(take(1))
      .subscribe((newMessages) => {
        console.log('newMessages', newMessages);
        this.offset += newMessages.messages.length;
      });
  }

  onConvertTextToSpeech(text: string): void {
    this.speechService.speak(text);
  }

  ngOnInit(): void {
    this.scrollService.onScroll$
    .pipe(takeUntil(this.onDestroy$))
    .subscribe((event) => this.onScroll(event));
  }

  ngOnDestroy() {
    this.chatService.leaveRoom();
    this.onDestroy$.next(true);
  }
}
