import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'ngx-users',
    imports: [FormsModule, CommonModule],
    template: `
    <div style="text-align:center">
      <h1>Generate Text with OpenAI</h1>
      <form (ngSubmit)="onSubmit()">
        <input type="text" [(ngModel)]="prompt" name="prompt" required>
        <button type="submit">Generate</button>
      </form>
    </div>

    <div *ngIf="generatedText">
      <h2>Generated Text:</h2>
      <p>{{ generatedText }}</p>
    </div>
  `
})
export class UsersComponent {
  private http = inject(HttpClient);
  prompt = '';
  generatedText: string | null = null;

  onSubmit() {
    this.http.post<{ generatedText: string }>('/api/openai/generate', { content: this.prompt })
      .subscribe({
        next: (response) => {
          this.generatedText = response.generatedText;
        },
        error: (error) => {
          console.error('There was an error!', error);
        }
      });
  }
}
