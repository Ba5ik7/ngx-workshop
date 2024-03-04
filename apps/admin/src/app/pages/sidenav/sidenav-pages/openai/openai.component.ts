import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { OpenaiService } from '../../../../shared/services/openai/openai.service';
import { combineLatest, map } from 'rxjs';

@Component({
  standalone: true,
  selector: 'ngx-chat',
  imports: [CommonModule],
  template: `
    @if (viewModal$ | async; as vm) {
      @for (item of vm.openaiResponses; track $index) {
        <div><pre><code>{{ item | json }}</code></pre></div>
      }
    }
  `,
  styles: [``]
})
export class OpenaiComponent {
  openAiService = inject(OpenaiService);

  viewModal$ = combineLatest([this.openAiService.openaiResponses$])
  .pipe(map(([openaiResponses]) => ({ openaiResponses })));
}
