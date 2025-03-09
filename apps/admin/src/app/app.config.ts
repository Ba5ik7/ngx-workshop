import { ApplicationConfig, inject, provideAppInitializer } from '@angular/core';
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
import { NGX_EDITORJS_OPTIONS } from '@tmdjr/ngx-editorjs';
import { NgxEditorjsParagraphBlockMediator } from '@tmdjr/ngx-editorjs-paragraph-block';
import { NgxEditorjsBlockquotesBlockMediator } from '@tmdjr/ngx-editorjs-blockquotes-block';
import { NgxEditorjsImageBlockMediator } from '@tmdjr/ngx-editorjs-image-block';
import { NgxEditorjsCodeBlockMediator } from '@tmdjr/ngx-editorjs-code-block';
import { NgxEditorjsMermaidBlockMediator } from '@tmdjr/ngx-editorjs-mermaid-block';
import { NgxEditorjsQuizBlockMediator } from '@tmdjr/ngx-editorjs-quiz-block';
import { provideMarkdown } from 'ngx-markdown';
import { IMAGE_LOADER } from '@angular/common';

import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
// import { provideCloudinaryLoader } from '@angular/common';}

// Factory function to register icons
export function registerIcons(matIconRegistry: MatIconRegistry, domSanitizer: DomSanitizer) {
  return () => {
    const openAiIconSvg = document.querySelector('#openai_white_logomark')?.outerHTML;
    openAiIconSvg && matIconRegistry.addSvgIconLiteral(
      'openai_white_logomark',
      domSanitizer.bypassSecurityTrustHtml(openAiIconSvg)
    );

    const rxjsIconSvg = document.querySelector('#rxjs_white_logomark')?.outerHTML;
    rxjsIconSvg && matIconRegistry.addSvgIconLiteral(
      'rxjs_white_logomark',
      domSanitizer.bypassSecurityTrustHtml(rxjsIconSvg)
    );

    const nestjsIconSvg = document.querySelector('#nestjs_white_logomark')?.outerHTML;
    nestjsIconSvg && matIconRegistry.addSvgIconLiteral(
      'nestjs_white_logomark',
      domSanitizer.bypassSecurityTrustHtml(nestjsIconSvg)
    );

    const angularIconSvg = document.querySelector('#angular_white_logomark')?.outerHTML;
    angularIconSvg && matIconRegistry.addSvgIconLiteral(
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
        const initializerFn = (registerIcons)(inject(MatIconRegistry), inject(DomSanitizer));
        return initializerFn();
      }),
    {
      provide: NGX_EDITORJS_OPTIONS,
      useValue: {
        blocks: [
          {
            name: 'Paragraph',
            component: NgxEditorjsParagraphBlockMediator,
            componentInstanceName: 'NgxEditorjsParagraphBlockMediator',
          },
          {
            name: 'Blockquotes',
            component: NgxEditorjsBlockquotesBlockMediator,
            componentInstanceName: 'NgxEditorjsBlockquotesBlockMediator',
          },
          {
            name: 'Image',
            component: NgxEditorjsImageBlockMediator,
            componentInstanceName: 'NgxEditorjsImageBlockMediator',
          },
          {
            name: 'Code',
            component: NgxEditorjsCodeBlockMediator,
            componentInstanceName: 'NgxEditorjsCodeBlockMediator',
          },
          {
            name: 'Quiz',
            component: NgxEditorjsQuizBlockMediator,
            componentInstanceName: 'NgxEditorjsQuizBlockMediator',
          },
          {
            name: 'Mermaid',
            component: NgxEditorjsMermaidBlockMediator,
            componentInstanceName: 'NgxEditorjsMermaidBlockMediator',
          },
        ],
      },
    },
  ],
};
