import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IOpenAIResponse, IOpenAIResponseChoice, IOpenAIResponseUsage } from '../../../interfaces/openai-response.interface';
import { Document } from 'mongoose';

export type TOpenAIResponseDocument = OpenAIResponse & Document;
export type TOpenAIResponseUsageDocument = OpenAIResponseUsage & Document;


export class OpenAIResponseUsage implements IOpenAIResponseUsage {
  @Prop({ required: true })
  prompt_tokens: number;
  
  @Prop({ required: true })
  completion_tokens: number;
  
  @Prop({ required: true })
  total_tokens: number;
}

export const OpenAIResponseUsageSchema = SchemaFactory.createForClass(OpenAIResponseUsage);

@Schema()
export class OpenAIResponse implements IOpenAIResponse {
  @Prop({ required: true })
  id: string;
  
  @Prop({ required: true })
  choices: IOpenAIResponseChoice[];

  @Prop({ type: OpenAIResponseUsage, required: true })
  usage: IOpenAIResponseUsage;
  
  @Prop({ required: true })
  created: number;
  
  @Prop({ required: true })
  model: string;
  
  @Prop({ required: true })
  object: string;
}  

export const OpenAIResponseSchema = SchemaFactory.createForClass(OpenAIResponse);



// OpenAI response: {
//   id: 'chatcmpl-8yqpc9B3H4FcvJ44kgTZj7U28t0dU',
//   object: 'chat.completion',
//   created: 1709513456,
//   model: 'gpt-3.5-turbo-0125',
//   choices: [
//     {
//       index: 0,
//       message: [Object],
//       logprobs: null,
//       finish_reason: 'stop'
//     }
//   ],
//   usage: { prompt_tokens: 399, completion_tokens: 427, total_tokens: 826 },
//   system_fingerprint: 'fp_2b778c6b35'
// }