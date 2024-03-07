import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IChatMessage, IChatroom } from '../../../interfaces/chatroom.interface';
import { Document } from 'mongoose';

export type TChatroomDocument = Chatroom & Document;

@Schema()
export class Chatroom implements IChatroom {
  @Prop({ required: true })
  roomName: string;

  @Prop({ required: true })
  users: string[];

  @Prop({ required: true })
  messages: IChatMessage[];
}

export const ChatroomSchema = SchemaFactory.createForClass(Chatroom);

