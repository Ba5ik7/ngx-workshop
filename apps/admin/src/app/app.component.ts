import { RouterModule } from '@angular/router';
import { Component, ViewEncapsulation } from '@angular/core';
import { NavigationService } from './shared/services/navigation/navigation.service';
import { NavbarComponent } from './shared/components/navbar/navbar.component';

@Component({
  standalone: true,
  imports: [NavbarComponent, RouterModule],
  selector: 'ngx-admin',
  template: `
    <ngx-navbar class="mat-elevation-z6"></ngx-navbar>
    <router-outlet></router-outlet>
  `,
  styles: [`
    ngx-admin {
      display: flex;
      flex-direction: column;
      height: 100vh;

      & > workshop-sidenav { flex: 1; }
      & > router-outlet + .main-content,
      & > router-outlet + workshop-sidenav {
        margin-top: 56px;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
      }
    }
  `],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {

  constructor(navigationService: NavigationService) {
    navigationService.initializeAppData();
  }
}
