import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';
import { Chatroom, ChatroomSchema } from './schemas/chatroom.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatroomController } from './chat.controller';
import { OpenAIService } from '../open-ai/open-ai.service';
import { OpenAIResponse, OpenAIResponseSchema } from '../open-ai/schemas/openai-response.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Chatroom.name,
        schema: ChatroomSchema,
      },
      {
        name: OpenAIResponse.name,
        schema: OpenAIResponseSchema,
      }
    ]),
  ],
  providers: [ChatGateway, ChatService, OpenAIService],
  controllers: [ChatroomController],
})
export class ChatModule {}
