import { Controller, Get, Param, Query } from '@nestjs/common';
import { Roles } from '../../decorators/role.decorator';
import { Role } from '../../enums/role.enum';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatroomController {

  constructor(private readonly chatService: ChatService) {}

  // @Roles(Role.Admin)
  // @Post('generate')
  // async generateContent(@Body() prompt: Record<string, string>) {
  //   const generatedText = await this.chatService.generateText(prompt.content);
  //   return { generatedText };
  // }

  @Roles(Role.Admin)
  @Get('chatrooms')
  async getChatrooms() {
    return await this.chatService.getChatrooms();
  }

  @Roles(Role.Admin)
  @Get('messages')
  async getChatroomOffsetMessages(
    @Query('chatroom') chatroom: string,
    @Query('offset') offset: number
  ) {
    return await this.chatService.getChatroomOffsetMessages(chatroom, offset);
  }
}
