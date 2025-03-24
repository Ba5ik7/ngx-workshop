import { CommonModule } from '@angular/common';
import { Component, signal, input } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { SubjectLevel } from '../../../../../shared/services/assessment-test/assessment-test.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'ngx-todo-widget',
  imports: [CommonModule, MatExpansionModule, RouterLink],
  template: `
    <h2>To Do</h2>
    <div class="todo-list" [routerLink]="['/assessment-test']">
      <img src="../../../assets/img/nestjs2.svg" />
      <img src="../../../assets/img/angular_nav_gradient.gif" />
      <img src="../../../assets/img/rxjs1.svg" />
    </div>
    <h3>Just keep taking test for now...</h3>
  `,
  styles: [
    `
      :host {
        h2 {
          font-weight: 300;
        }
        img {
          width: 176px;
          height: 176px;
        }

        .todo-list {
          display: flex;
          justify-content: space-around;
          cursor: pointer;
        }
      }
    `,
  ],
})
export class TodoWidgetComponent {
  panelOpenState = signal(false);
  data = input.required<SubjectLevel[]>();
}
