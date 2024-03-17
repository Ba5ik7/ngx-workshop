import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import axios from 'axios';
import { OpenAIResponse, TOpenAIResponseDocument } from './schemas/openai-response.schema';
import { Model } from 'mongoose';
import { IOpenAIResponse } from '../../interfaces/openai-response.interface';

@Injectable()
export class OpenAIService {
  constructor(
    @InjectModel(OpenAIResponse.name) private openAIResponseModel: Model<TOpenAIResponseDocument>,
  ) {}

  private readonly openAIEndpoint = 'https://api.openai.com/v1/chat/completions';
  private readonly apiKey = process.env.OPEN_AI_API_KEY; // Securely manage your API key

  async generateText(messageContent: string): Promise<IOpenAIResponse> {
    try {
      const response = await axios.post(
        this.openAIEndpoint,
        {
          model: 'gpt-3.5-turbo', // Specify the model here
          messages: [
            // {
            //   role: 'system',
            //   content: `Imagine you are a Web and Angular expert tasked with creating an engaging and informative workshop titled 'Mastering ViewContainerRef in Angular'. Your goal is to help intermediate Angular developers understand the concept of ViewContainerRef, its importance in Angular applications, and how to effectively use it for dynamic component loading. The workshop should be structured into multiple pages, each designed to offer a mix of theoretical knowledge and practical exercises.

            //   For the workshop overview, provide a catchy title and a one-sentence summary that highlights the key learning objective of understanding and utilizing ViewContainerRef in Angular projects.
              
            //   Page 1: Introduction to ViewContainerRef
              
            //   Title: Introduce ViewContainerRef in Angular
            //   Objective: To understand what ViewContainerRef is and its role in Angular.
            //   Introduction: Explain ViewContainerRef, its significance, and when it's typically used in Angular applications.
            //   Image: Include a diagram or visual representation to help illustrate where ViewContainerRef fits within Angular's rendering architecture (1024px by 1024px).
            //   Hands-on Exercise: Guide the user through a simple exercise to create a ViewContainerRef instance.
            //   Step-by-Step Instructions: Provide clear, concise steps for the exercise.
            //   Discussion Points: Suggest topics for further exploration or discussion about ViewContainerRef.
            //   Further Exploration: Recommend additional resources for deepening understanding of ViewContainerRef.
            //   Subsequent Pages: Follow a similar structure, diving deeper into more advanced use cases, tips for best practices, and common pitfalls to avoid when working with ViewContainerRef.
              
            //   Quizzes and Code Examples: Throughout the workshop, intersperse quizzes to test understanding and include practical code examples to illustrate key concepts.
              
            //   End the workshop with a conclusion page summarizing the key takeaways and encouraging further practice and exploration.
              
            //   Please generate the content for this workshop, adopting a tone that is knowledgeable, engaging, and accessible to intermediate Angular developers.`
            // },
            {
              role: 'system',
              content: `Deubgging`
            },
            {
              role: 'user',
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
      // console.log('OpenAI response:', response.data);
      return await this.createOpenAIResponse(response.data);
    } catch (error) {
      console.error('Error calling OpenAI API:', error);
      throw new Error('Failed to generate text from OpenAI API');
    }
  }

  async createOpenAIResponse(response: IOpenAIResponse) {
    return await this.openAIResponseModel.create(response);
  }

  async getAiResponses(): Promise<IOpenAIResponse[]> {
    // Limit the number of items returned
    return await this.openAIResponseModel.find().limit(10).sort({ createdAt: -1 });
  }
}
