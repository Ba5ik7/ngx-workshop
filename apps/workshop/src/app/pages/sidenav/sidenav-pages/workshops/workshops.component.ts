import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'ngx-workshops',
    template: `<router-outlet></router-outlet>`,
    styles: [`
    :host {
      display: block;
      width: 100%;
    }
  `],
    imports: [
        RouterModule
    ]
})
export class WorkshopsComponent {}
