import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ngx-openai-workshop-creator',
  standalone: true,
  imports: [CommonModule],
  template: `<p>openai-workshop-creator works!</p>`,
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OpenaiWorkshopCreatorComponent {}
