import { RouterModule } from '@angular/router';
import { Component, ViewEncapsulation, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Event, NavigationEnd, Router } from '@angular/router';
import { filter, map, pairwise, startWith } from 'rxjs';
import { SignInModalComponent } from './shared/components/sign-in-modal/sign-in-modal.component';
import { UserStateService } from './shared/services/user-state/user-state.service';
import { MatDialogModule } from '@angular/material/dialog';
import { NavbarComponent } from './shared/components/navbar/navbar.component';

@Component({
  standalone: true,
  selector: 'ngx-workshop',
  template: `
    <ngx-navbar></ngx-navbar>
    <router-outlet></router-outlet>
  `,
  styles: [`
    ngx-workshop {
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
  imports: [
    RouterModule,
    NavbarComponent,
    MatDialogModule
  ],
})
export class AppComponent {
  resetScrollPosition = inject(Router).events
  .pipe(
    filter((event: Event): event is NavigationEnd => event instanceof NavigationEnd),
    map(e => e.urlAfterRedirects),
    startWith(''),
    pairwise()
  ).subscribe(() => resetScrollPosition());

  matDialog = inject(MatDialog);
  openSignInModal = inject(UserStateService).openSignInModal$
  .pipe(filter(open => open))
  .subscribe(() => {
    this.matDialog.open(SignInModalComponent, { width: '300px' });
  });
}

function resetScrollPosition() {
  if (typeof document === 'object' && document) {
    const sidenavContent = window.document.querySelector('.mat-drawer-content');
    if (sidenavContent) {
      sidenavContent.scrollTop = 0;
    }
  }
}
