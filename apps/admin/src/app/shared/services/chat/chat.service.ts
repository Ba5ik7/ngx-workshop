import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';

export interface Message {
  user: string;
  content: string;
}

export interface ChatRoom {
  users: string[];
  messages: Message[];
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

  private client!: Socket;
  private connected$ = new BehaviorSubject(false);
  private user$ = new BehaviorSubject('Ngx-Wesley');
  private rooms$ = new BehaviorSubject<string[]>([]);
  private activeRoom$ = new BehaviorSubject('General');
  private chatRoom$ = new BehaviorSubject<ChatRoom>({
    users: [],
    messages: [],
  });

  constructor() { 
    this.client = io('/chat', { autoConnect: true, path: '/api/socket.io' });
    this.client.on('connect', () => this.connected());
    this.client.on('userJoined', (user: string) => this.userJoined(user));
    this.client.on('messageToClient', (message: Message) => this.messageToClient(message));
    
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

  sendMessage(content: string) {
    const message = {
      user: this.user$.value,
      content,
    };
    this.client.emit('messageToServer', {
      room: this.activeRoom$.value,
      message,
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

  private messageToClient(message: Message): void {
    const chatRoom = this.chatRoom$.value;
    if (chatRoom) {
      chatRoom.messages.push(message);
      this.chatRoom$.next(chatRoom);
    }
  }
}
