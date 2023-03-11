import { RouterModule } from '@angular/router';
import { Component, ViewEncapsulation } from '@angular/core';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { Event, NavigationEnd, Router } from '@angular/router';
import { filter, map, pairwise, startWith } from 'rxjs';
import { SignInModalComponent } from './shared/components/sign-in-modal/sign-in-modal.component';
import { NavigationService } from './shared/services/navigation/navigation.service';
import { UserStateService } from './shared/services/user-state/user-state.service';

import { NavbarModule } from './shared/components/navbar/navbar.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { HighlightOptions, HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';
import { JwtInterceptor } from './interceptors/jwt.interceptor';

import { NGX_EDITORJS_CLIENT_OPTIONS } from '@tmdjr/ngx-editorjs-client';
import { NgxEditorjsParagraphClientBlockComponent } from '@tmdjr/ngx-editorjs-paragraph-block';
import { NgxEditorjsBlockquotesClientBlockComponent } from '@tmdjr/ngx-editorjs-blockquotes-block';
import { NgxEditorjsImageClientBlockComponent } from '@tmdjr/ngx-editorjs-image-block';
import { NgxEditorjsCodeClientBlockComponent } from '@tmdjr/ngx-editorjs-code-block';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';

@Component({
  standalone: true,
  imports: [ RouterModule,
    HttpClientModule,
    NavbarModule,
    MatDialogModule
  ],
  selector: 'ngx-root',
  template: ``,
  styles: [],
  encapsulation: ViewEncapsulation.None,
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    {
      provide: HIGHLIGHT_OPTIONS,
      useValue: <HighlightOptions>{
        coreLibraryLoader: () => import('highlight.js/lib/core'),
        languages: {
          typescript: () => import('highlight.js/lib/languages/typescript'),
          css: () => import('highlight.js/lib/languages/css'),
          html: () => import('highlight.js/lib/languages/xml')
        },
        themePath: 'assets/css/highlightjs-themes/gradient-dark.css'
      }
    },
    {
      provide: NGX_EDITORJS_CLIENT_OPTIONS,
      useValue: {
        blocks: [
          {
            name: 'Paragraph',
            component: NgxEditorjsParagraphClientBlockComponent,
            componentInstanceName: 'NgxEditorjsParagraphBlockMediator'
          },
          {
            name: 'Blockquotes',
            component: NgxEditorjsBlockquotesClientBlockComponent,
            componentInstanceName: 'NgxEditorjsBlockquotesBlockMediator'
          },
          {
            name: 'Image',
            component: NgxEditorjsImageClientBlockComponent,
            componentInstanceName: 'NgxEditorjsImageBlockMediator'
          },
          {
            name: 'Code',
            component: NgxEditorjsCodeClientBlockComponent,
            componentInstanceName: 'NgxEditorjsCodeBlockMediator'
          }
        ]
      }
    },
  ],
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
