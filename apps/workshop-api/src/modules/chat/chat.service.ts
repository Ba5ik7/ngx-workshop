import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Chatroom, TChatroomDocument } from './schemas/chatroom.schema';
import { Model } from 'mongoose';
import { OpenAIService } from '../open-ai/open-ai.service';

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
  constructor(
    @InjectModel(Chatroom.name) private chatroomModel: Model<TChatroomDocument>,
    private openAIService: OpenAIService
  ) {}

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

  async joinRoom(roomName: string, userId: string) {
    return await this.chatroomModel.updateOne(
      { roomName: roomName },
      { $push: { users: userId } }
    );
  }

  async leaveRoom(room: string, user: string) {
    return await this.chatroomModel
      .updateOne({ room: room }, { $pull: { users: user } });
  }

  async addMessage(room: string, message: Message, useAi: boolean) {
    this.updateChatroomMessage(message.user, message.content, room);
    if (useAi) {
      const aiResponse = await this.openAIService.generateText(message.content);
      const aiModelName = `OpenAI: ${aiResponse.model}`;
      const aiMessage = aiResponse.choices[0].message.content;
      this.updateChatroomMessage(aiModelName, aiMessage, room);
      return {
        user: aiModelName,
        content: aiMessage 
      };
    }
    return await new Promise((resolve) => resolve(undefined));
  }

  async getChatrooms() {
    return await this.chatroomModel.find().exec();
  }

  async getChatroom(roomName: string) {
    return await this.chatroomModel.findOne({ roomName:
      roomName }).exec();
  }

  async createChatroom(chatroom: Chatroom) {
    return await this.chatroomModel.create(chatroom);
  }

  async updateChatroomMessage(
    email: string,
    messageContent: string,
    roomName: string
  ) {
    return await this.chatroomModel.updateOne(
      { roomName: roomName },
      {
        $push: {
          messages: {
            user: email,
            content: messageContent,
            timestamp: new Date(),
          },
        },
      }
    );
  }

  async getChatroomMostRecentMessages(roomName: string) {
    return await this.chatroomModel.aggregate([
      { $match: { roomName: roomName } },
      { $unwind: '$messages' },
      { $sort: { 'messages.timestamp': -1 } },
      { $limit: 10 },
      { $sort: { 'messages.timestamp': 1 } },
      { $group: { _id: '$_id', messages: { $push: '$messages' } } },
    ]);
  }
}
