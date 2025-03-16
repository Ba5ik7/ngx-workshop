import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-assessment-test',
  host: { class: 'main-content' },
  imports: [RouterModule],
  template: `
    <h1>Assessment Test</h1>
    <router-outlet></router-outlet>
  `,
  styles: [
    `
      :host {
        display: flex;
        flex-direction: column;
      }
    `,
  ],
})
export class AssessmentTestComponent {}
