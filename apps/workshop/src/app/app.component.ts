import { RouterModule } from '@angular/router';
import { Component, ViewEncapsulation } from '@angular/core';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { Event, NavigationEnd, Router } from '@angular/router';
import { filter, map, pairwise, startWith } from 'rxjs';
import { SignInModalComponent } from './shared/components/sign-in-modal/sign-in-modal.component';
import { NavigationService } from './shared/services/navigation/navigation.service';
import { UserStateService } from './shared/services/user-state/user-state.service';

import { NavbarModule } from './shared/components/navbar/navbar.module';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';

@Component({
  standalone: true,
  imports: [ RouterModule,
    NavbarModule,
    MatDialogModule
  ],
  selector: 'ngx-workshop',
  template: `
    <app-navbar class="mat-elevation-z6"></app-navbar>
    <router-outlet></router-outlet>
  `,
  styles: [`
    ngx-workshop {
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
    ngx-workshop > workshop-sidenav {
      flex: 1;
    }

    ngx-workshop > router-outlet + .main-content,
    ngx-workshop > router-outlet + workshop-sidenav {
      margin-top: 56px;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
    }

    @media (max-width: 720px) {
      ngx-workshop > router-outlet + .main-content,
      ngx-workshop > router-outlet + workshop-sidenav {
        margin-top: 92px;
      }
    }

  `],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  constructor(
    navigationService: NavigationService,
    userStateService: UserStateService,
    router: Router,
    matDialog: MatDialog
  ) {
    navigationService.initializeAppData(); // !important: Move this to App INITIALIZER
    router.events
    .pipe(
      filter((event: Event): event is NavigationEnd => event instanceof NavigationEnd),
      map(e => e.urlAfterRedirects),
      startWith(''),
      pairwise()
    )
    .subscribe(() => resetScrollPosition());

    userStateService.isUserLoggedIn().subscribe(); // !important: Move this to App INITIALIZER

    userStateService.openSignInModal$
    .pipe(filter(open => open))
    .subscribe(() => {
      matDialog.open(SignInModalComponent, { width: '300px' });
    });
  }
}

function resetScrollPosition() {
  if (typeof document === 'object' && document) {
    const sidenavContent = window.document.querySelector('.mat-drawer-content');
    if (sidenavContent) {
      sidenavContent.scrollTop = 0;
    }
  }
}
