import { CommonModule } from '@angular/common';
import { Component, signal, input } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { SubjectLevel } from '../../../../../shared/services/assessment-test/assessment-test.service';

@Component({
  selector: 'ngx-todo-widget',
  imports: [CommonModule, MatExpansionModule],
  template: `
    <h2>To Do</h2>
  `,
})
export class TodoWidgetComponent {
  panelOpenState = signal(false);
  data = input.required<SubjectLevel[]>();
}
