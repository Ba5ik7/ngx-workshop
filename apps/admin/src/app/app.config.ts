import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
} from '@angular/core';
import {
  RouteReuseStrategy,
  provideRouter,
  withEnabledBlockingInitialNavigation,
} from '@angular/router';
import { WorkshopReuseStrategy, appRoutes } from './app.routes';
import { importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './shared/interceptors/jwt.interceptor';
import { provideMarkdown } from 'ngx-markdown';
import { IMAGE_LOADER } from '@angular/common';

import { NGX_EDITORJS_OPTIONS } from '@tmdjr/ngx-editor-js2';
import { NgxEditorJs2ImageComponent } from '@tmdjr/ngx-editor-js2-image';
import { NgxEditorJs2BlockquotesComponent } from '@tmdjr/ngx-editor-js2-blockquotes';
import { NgxEditorJs2CodemirrorComponent } from '@tmdjr/ngx-editor-js2-codemirror';
import { NgxEditorJs2PopQuizComponent } from '@tmdjr/ngx-editor-js2-pop-quiz';

import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
// import { provideCloudinaryLoader } from '@angular/common';}

// Factory function to register icons
export function registerIcons(
  matIconRegistry: MatIconRegistry,
  domSanitizer: DomSanitizer
) {
  return () => {
    const openAiIconSvg = document.querySelector(
      '#openai_white_logomark'
    )?.outerHTML;
    openAiIconSvg &&
      matIconRegistry.addSvgIconLiteral(
        'openai_white_logomark',
        domSanitizer.bypassSecurityTrustHtml(openAiIconSvg)
      );

    const rxjsIconSvg = document.querySelector(
      '#rxjs_white_logomark'
    )?.outerHTML;
    rxjsIconSvg &&
      matIconRegistry.addSvgIconLiteral(
        'rxjs_white_logomark',
        domSanitizer.bypassSecurityTrustHtml(rxjsIconSvg)
      );

    const nestjsIconSvg = document.querySelector(
      '#nestjs_white_logomark'
    )?.outerHTML;
    nestjsIconSvg &&
      matIconRegistry.addSvgIconLiteral(
        'nestjs_white_logomark',
        domSanitizer.bypassSecurityTrustHtml(nestjsIconSvg)
      );

    const angularIconSvg = document.querySelector(
      '#angular_white_logomark'
    )?.outerHTML;
    angularIconSvg &&
      matIconRegistry.addSvgIconLiteral(
        'angular_white_logomark',
        domSanitizer.bypassSecurityTrustHtml(angularIconSvg)
      );
  };
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes, withEnabledBlockingInitialNavigation()),
    provideMarkdown(),
    // provideCloudinaryLoader('https://res.cloudinary.com/dowdpiikk'),
    importProvidersFrom(BrowserAnimationsModule),
    importProvidersFrom(HttpClientModule),

    { provide: IMAGE_LOADER, useValue: (img: { src: string }) => img.src },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: RouteReuseStrategy, useClass: WorkshopReuseStrategy },
    provideAppInitializer(() => {
      const initializerFn = registerIcons(
        inject(MatIconRegistry),
        inject(DomSanitizer)
      );
      return initializerFn();
    }),
    {
      provide: NGX_EDITORJS_OPTIONS,
      useValue: {
        consumerSupportedBlocks: [
          {
            name: 'Image',
            component: NgxEditorJs2ImageComponent,
            componentInstanceName: 'NgxEditorJs2ImageComponent',
          },
          {
            name: 'Blockquote',
            component: NgxEditorJs2BlockquotesComponent,
            componentInstanceName: 'NgxEditorJs2BlockquotesComponent',
          },
          {
            name: 'Codemirror',
            component: NgxEditorJs2CodemirrorComponent,
            componentInstanceName: 'NgxEditorJs2CodemirrorComponent',
          },
          {
            name: 'Pop Quiz',
            component: NgxEditorJs2PopQuizComponent,
            componentInstanceName: 'NgxEditorJs2PopQuizComponent',
          },
        ],
      },
    },
  ],
};
