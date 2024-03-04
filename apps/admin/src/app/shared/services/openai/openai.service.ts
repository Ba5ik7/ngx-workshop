import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { IOpenAIResponse } from '../../interfaces/openai-responses.interface';

@Injectable({
  providedIn: 'root'
})
export class OpenaiService {

  httpClient = inject(HttpClient);

  openaiResponses = new BehaviorSubject<IOpenAIResponse[] | undefined>(undefined);
  openaiResponses$ = this.openaiResponses.asObservable();

  fetchOpenaiResponses() {
    return this.httpClient.get<IOpenAIResponse[]>('/api/openai/responses')
    .pipe(tap((openaiResponses) => this.openaiResponses.next(openaiResponses)))
  }
}
