import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { ChatService, Message } from './chat.service';

@WebSocketGateway({ namespace: 'chat' })
export class ChatGateway {
  constructor(private chatService: ChatService) {}

  @SubscribeMessage('identify')
  async handleIdentify(client: Socket, user: string) {
    this.chatService.identify(user, client.id);
    return this.chatService.getChatrooms();
  }

  @SubscribeMessage('disconnect')
  async handleDisconnect(client: Socket) {
    const user = this.chatService.disconnect(client.id);
    client.broadcast.emit('userLeft', user);
  }

  @SubscribeMessage('joinRoom')
  handleJoinRoom(client: Socket, data: { user: string; room: string }) {
    this.chatService.joinRoom(data.room, data.user);
    client.join(data.room);
    client.to(data.room).emit('userJoined', data.user);
    return this.chatService.getChatroom(data.room);
  }

  @SubscribeMessage('leaveRoom')
  handleLeaveRoom(client: Socket, data: { user: string; room: string }) {
    this.chatService.leaveRoom(data.room, data.user);
    client.leave(data.room);
    client.to(data.room).emit('userLeft', data.user);
  }

  @SubscribeMessage('messageToServer')
  async handleMessageToServer(
    client: Socket,
    data: { useAi: boolean; room: string; message: Message; },
  ) {
    this.chatService.addMessage(data.room, data.message, data.useAi)
    .then((aiMessage: Message | undefined) => {
      if (aiMessage) {
        client.to(data.room).emit('messageToClient', aiMessage);
        client.emit('messageToClient', aiMessage);
      }
    });

    client.to(data.room).emit('messageToClient', data.message);
    client.emit('messageToClient', data.message);
  }
}
