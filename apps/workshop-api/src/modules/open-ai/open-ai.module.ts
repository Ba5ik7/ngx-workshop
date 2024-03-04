import { Module } from '@nestjs/common';
import { OpenAiController } from './open-ai.controller';
import { OpenAIService } from './open-ai.service';
import { MongooseModule } from '@nestjs/mongoose';
import { OpenAIResponse, OpenAIResponseSchema } from './schemas/openai-response.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: OpenAIResponse.name,
        schema: OpenAIResponseSchema,
      },
    ]),
  ],
  providers: [OpenAIService],
  controllers: [OpenAiController],
})
export class OpenAIModule {}
