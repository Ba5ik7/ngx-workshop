import { NxWelcomeComponent } from './nx-welcome.component';
import { RouterModule } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  standalone: true,
  imports: [NxWelcomeComponent, RouterModule],
  selector: 'ngx-root',
  template: ` <ngx-nx-welcome></ngx-nx-welcome> `,
  styles: [],
})
export class AppComponent {
  title = 'admin';
}
