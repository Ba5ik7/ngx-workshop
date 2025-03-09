import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpenaiService } from '../../../../../../shared/services/openai/openai.service';
import { combineLatest, map } from 'rxjs';

@Component({
    selector: 'ngx-history',
    imports: [CommonModule],
    template: `
    @if (viewModal$ | async; as vm) {
      @for (item of vm.openaiResponses; track $index) {
        <div><pre><code>{{ item | json }}</code></pre></div>
      }
    }
  `,
    styles: `
    :host {
      display: block;
    }
  `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HistoryComponent {
  openAiService = inject(OpenaiService);

  viewModal$ = combineLatest([this.openAiService.openaiResponses$])
  .pipe(map(([openaiResponses]) => ({ openaiResponses })));
}
