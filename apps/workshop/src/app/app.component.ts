import { RouterLink, RouterModule } from '@angular/router';
import { Component, ViewEncapsulation, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Event, NavigationEnd, Router } from '@angular/router';
import { filter, map, pairwise, startWith } from 'rxjs';
import { AuthenticateModalComponent } from './shared/components/authenticate-modal/authenticate-modal.component';
import { UserStateService } from './shared/services/user-state/user-state.service';
import { MatDialogModule } from '@angular/material/dialog';
import { NavbarComponent } from './shared/components/navbar/navbar.component';

@Component({
  selector: 'ngx-workshop',
  imports: [RouterModule, NavbarComponent, MatDialogModule],
  encapsulation: ViewEncapsulation.None,
  template: `
    <ngx-navbar></ngx-navbar>
    <router-outlet></router-outlet>
  `,
  styles: [
    `
      ngx-workshop {
        display: flex;
        flex-direction: column;
        height: 100vh;
        & > ngx-sidenav {
          flex: 1;
        }
        & > router-outlet + .main-content,
        & > router-outlet + ngx-sidenav {
          margin-left: 110px;
          overflow-y: auto;
          -webkit-overflow-scrolling: touch;
        }
        @media (max-width: 720px) {
          & > router-outlet + .main-content,
          & > router-outlet + ngx-sidenav {
            margin-top: 92px;
            margin-left: 0;
          }
        }
      }
    `,
  ],
})
export class AppComponent {
  resetScrollPosition = inject(Router)
    .events.pipe(
      filter(
        (event: Event): event is NavigationEnd => event instanceof NavigationEnd
      ),
      map((e) => e.urlAfterRedirects),
      startWith(''),
      pairwise()
    )
    .subscribe(() => resetScrollPosition());

  matDialog = inject(MatDialog);
  openSignInModal = inject(UserStateService)
    .openSignInModal$.pipe(filter((open) => open))
    .subscribe(() => {
      this.matDialog.open(AuthenticateModalComponent, { width: '300px' });
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
