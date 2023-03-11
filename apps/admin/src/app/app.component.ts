import { RouterModule } from '@angular/router';
import { Component, ViewEncapsulation } from '@angular/core';
import { NavigationService } from './shared/services/navigation/navigation.service';
import { NavbarModule } from './shared/components/navbar/navbar.module';
import { HighlightModule } from 'ngx-highlightjs';

@Component({
  standalone: true,
  imports: [HighlightModule, NavbarModule, RouterModule],
  selector: 'ngx-admin',
  template: `
    <app-navbar class="mat-elevation-z6"></app-navbar>
    <router-outlet></router-outlet>
    <pre><code highlight="html"><html></html></code></pre>
  `,
  styles: [`
    ngx-admin {
      display: flex;
      flex-direction: column;
      height: 100vh;
    }

    app-navbar {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 2;
    }
    ngx-admin > workshop-sidenav {
      flex: 1;
    }

    ngx-admin > router-outlet + .main-content,
    ngx-admin > router-outlet + workshop-sidenav {
      margin-top: 56px;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
    }
  `],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {

  constructor(navigationService: NavigationService) {
    navigationService.initializeAppData();
  }
}
