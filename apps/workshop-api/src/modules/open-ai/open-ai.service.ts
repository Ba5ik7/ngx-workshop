import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class OpenAIService {
  private readonly openAIEndpoint = 'https://api.openai.com/v1/chat/completions';
  private readonly apiKey = process.env.OPEN_AI_API_KEY; // Securely manage your API key

  async generateText(messageContent: string) {
    try {
      const response = await axios.post(
        this.openAIEndpoint,
        {
          model: 'gpt-3.5-turbo', // Specify the model here
          messages: [
            {
              role: "system",
              content: "You are a poetic assistant, skilled in explaining complex programming concepts with creative flair."
            },
            {
              role: "user",
              content: messageContent,
            },
          ],
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.apiKey}`,
          },
        },
      );
      // Assuming the response structure matches what you expect from chat completion
      return response.data.choices[0].message.content;
    } catch (error) {
      console.error('Error calling OpenAI API:', error);
      throw new Error('Failed to generate text from OpenAI API');
    }
  }
}
