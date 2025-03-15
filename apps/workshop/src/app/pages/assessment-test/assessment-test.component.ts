import { Component } from '@angular/core';

@Component({
  selector: 'app-assessment-test',
  host: { class: 'main-content' },
  template: ` <h1>Assessment Test</h1> `,
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
