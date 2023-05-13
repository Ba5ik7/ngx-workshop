import { RouterModule } from '@angular/router';
import { Component, inject, OnInit, ViewEncapsulation } from '@angular/core';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { ThemePickerService } from './shared/services/theme-picker/theme-picker.service';

@Component({
  standalone: true,
  imports: [NavbarComponent, RouterModule],
  selector: 'ngx-admin',
  template: `
    <ngx-navbar></ngx-navbar>
    <router-outlet></router-outlet>
  `,
  styles: [`
    ngx-admin {
      display: flex;
      flex-direction: column;
      height: 100vh;
      & > ngx-sidenav { flex: 1; }
      & > router-outlet + .main-content,
      & > router-outlet + ngx-sidenav {
        margin-top: 56px;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
      }
    }
  `],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {
  themePickerService = inject(ThemePickerService);
  ngOnInit(): void {
    this.themePickerService.init();
  }
}
