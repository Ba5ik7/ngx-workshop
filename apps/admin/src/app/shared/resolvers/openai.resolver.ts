import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Observable } from 'rxjs';
import { IOpenAIResponse } from '../interfaces/openai-responses.interface';
import { OpenaiService } from '../services/openai/openai.service';

type IOpenAIResponseResolver = ResolveFn<Observable<Partial<IOpenAIResponse[]> | undefined>>;
export const openaiResolver: IOpenAIResponseResolver = () => {  
  return inject(OpenaiService).fetchOpenaiResponses();
};
