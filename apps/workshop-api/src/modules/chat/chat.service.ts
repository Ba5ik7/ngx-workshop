import { Injectable } from '@nestjs/common';

export interface Message {
  user: string;
  content: string;
}

export interface ChatRoom {
  users: string[];
  messages: Message[];
}

@Injectable()
export class ChatService {
  users: Record<string, string> = {};
  chatRooms: Record<string, ChatRoom> = {
    General: { users: [], messages: [] },
    Angular: { users: [], messages: [] },
    NestJS: { users: [], messages: [] },
    RxJS: { users: [], messages: [] },
  };

  identify(user: string, clientId: string) {
    this.users[user] = clientId;
  }

  disconnect(clientId: string) {
    //look up user by clientId:
    const users = Object.keys(this.users);
    let userToRemove = '';
    users.forEach((user) => {
      if (this.users[user] === clientId) {
        userToRemove = user;
        return;
      }
    });
    if (userToRemove) {
      delete this.users[userToRemove];
      // remove user from any joined rooms
      const rooms = Object.keys(this.chatRooms);
      rooms.forEach((room) => {
        this.leaveRoom(room, userToRemove);
      });
    }
    return userToRemove;
  }

  joinRoom(room: string, user: string) {
    this.chatRooms[room].users.push(user);
    // sort the users alphabetically
    this.chatRooms[room].users.sort((a, b) => {
      return a.toLowerCase() >= b.toLowerCase() ? 1 : -1;
    });
  }

  leaveRoom(room: string, user: string) {
    this.chatRooms[room].users = this.chatRooms[room].users.filter(
      (u) => u !== user,
    );
  }

  getChatRoom(room: string) {
    return this.chatRooms[room];
  }

  getChatRooms() {
    const keys = Object.keys(this.chatRooms);
    return keys;
  }

  addMessage(room: string, message: Message) {
    this.chatRooms[room].messages.push(message);
  }
}
