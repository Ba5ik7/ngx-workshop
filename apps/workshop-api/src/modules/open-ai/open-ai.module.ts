import { Module } from '@nestjs/common';
import { OpenAiController } from './open-ai.controller';
import { OpenAIService } from './open-ai.service';

@Module({
  imports: [
  ],
  providers: [OpenAIService],
  controllers: [OpenAiController],
})
export class OpenAIModule {}
