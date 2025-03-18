import { Component, output } from '@angular/core';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'ngx-test-selection',
  imports: [MatButton],
  template: `
  <h1>Assessment Test Start</h1>
  <p>Click the button below to start the test. Once you start the test, you will not be able to go back.</p>
  <p>Good luck! & Don't Cheat!</p>
  <button mat-button (click)="startTest.emit()">Start Test</button>
  `,
})
export class TestSelectionComponent {
  startTest = output();
}
