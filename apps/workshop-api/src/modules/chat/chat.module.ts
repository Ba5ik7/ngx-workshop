import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';
import { Chatroom, ChatroomSchema } from './schemas/chatroom.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatroomController } from './chat.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Chatroom.name,
        schema: ChatroomSchema,
      },
    ]),
  ],
  providers: [ChatGateway, ChatService],
  controllers: [ChatroomController],
})
export class ChatModule {}
