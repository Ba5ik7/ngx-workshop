import { Body, Controller, Post } from '@nestjs/common';
import { Roles } from '../../decorators/role.decorator';
import { Role } from '../../enums/role.enum';
import { OpenAIService } from './open-ai.service';

@Controller('openai')
export class OpenAiController {

  constructor(private readonly openAIService: OpenAIService) {}

  @Roles(Role.Admin)
  @Post('generate')
  async generateContent(@Body() prompt: Record<string, string>) {
    const generatedText = await this.openAIService.generateText(prompt.content);
    return { generatedText };
  }
}
