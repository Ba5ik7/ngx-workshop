import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
@Component({
  standalone: true,
  selector: 'ngx-workshops',
  template: `<router-outlet></router-outlet>`,
  imports: [
    RouterModule
  ]
})
export class WorkshopsComponent { }
