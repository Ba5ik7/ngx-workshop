import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { IChatMessage, IChatroom } from '../../interfaces/chatrooms.interface';
import { UserStateService } from '../user-state/user-state.service';


export interface ChatRoom {
  users: string[];
  messages: IChatMessage[];
}

export interface ChatAppData {
  activeRoom: string;
  chatRoom: ChatRoom;
  connected: boolean;
  rooms: string[];
  user: string;
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  httpClient = inject(HttpClient);
  userStateService = inject(UserStateService);

  private client!: Socket;
  private connected$ = new BehaviorSubject(false);
  private user$ = new BehaviorSubject('Ngx-Wesley');
  private rooms$ = new BehaviorSubject<string[]>([]);
  private activeRoom$ = new BehaviorSubject('Angular');
  private chatRoom$ = new BehaviorSubject<ChatRoom>({
    users: [],
    messages: [],
  });

  constructor() { 
    this.client = io('/chat', { autoConnect: true, path: '/api/socket.io' });
    this.client.on('connect', () => this.connected());
    this.client.on('userJoined', (user: string) => this.userJoined(user));
    this.client.on('messageToClient', (message: IChatMessage) => this.messageToClient(message));
    
  }

  getChatAppData(): Observable<ChatAppData> {
    const data = combineLatest([
      this.activeRoom$,
      this.chatRoom$,
      this.connected$,
      this.rooms$,
      this.user$,
    ]).pipe(
      map((value) => {
        const [activeRoom, chatRoom, connected, rooms, user] = value;
        return {
          activeRoom,
          chatRoom,
          connected,
          rooms,
          user,
        };
      })
    );
    return data;
  }

  sendMessage(content: string, useAi: boolean) {
    this.userStateService.userMetadata$.pipe(
      map((userMetadata) => userMetadata?.email)
    ).subscribe((user) => {
      this.client.emit('messageToServer', {
        useAi,
        room: this.activeRoom$.value,
        message: {
          user,
          content,
        },
      });
    });
  }

  switchRoom(room: string) {
    const activeRoom = this.activeRoom$.value;
    this.leaveRoom(activeRoom);
    this.joinRoom(room);
    this.activeRoom$.next(room);
  }

  private connected(): void {
    this.client.emit('identify', this.user$.value, (rooms: string[]) => this.rooms$.next(rooms));
    this.joinRoom(this.activeRoom$.value);
    this.connected$.next(true);
  }

  private joinRoom(room: string) {
    const payload = { user: this.user$.value, room };
    this.client.emit('joinRoom', payload, (chatRoom: ChatRoom) => this.chatRoom$.next(chatRoom));
  }

  private leaveRoom(room: string) {
    this.client.emit('leaveRoom', { user: this.user$.value, room });
  }

  private userJoined(user: string): void {
    const chatRoom = this.chatRoom$.value;
    if (chatRoom) {
      chatRoom.users.push(user);
      chatRoom.users.sort((a, b) => {
        return a.toLowerCase() >= b.toLowerCase() ? 1 : -1;
      });
      this.chatRoom$.next(chatRoom);
    }
  }

  private messageToClient(message: IChatMessage): void {
    const chatRoom = this.chatRoom$.value;
    if (chatRoom) {
      chatRoom.messages.push(message);
      this.chatRoom$.next(chatRoom);
    }
  }

  fetchChatrooms() {
    return this.httpClient.get<IChatroom[]>('/api/chat/chatrooms');
  }
}
