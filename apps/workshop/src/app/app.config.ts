import { APP_INITIALIZER, ApplicationConfig } from '@angular/core';
import {
  RouteReuseStrategy,
  provideRouter,
  withEnabledBlockingInitialNavigation,
} from '@angular/router';
import { appRoutes, WorkshopReuseStrategy } from './app.routes';
import { importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './shared/interceptors/jwt.interceptor';
import { NGX_EDITORJS_CLIENT_OPTIONS } from '@tmdjr/ngx-editorjs-client';
import { NgxEditorjsParagraphClientBlockComponent } from '@tmdjr/ngx-editorjs-paragraph-block';
import { NgxEditorjsBlockquotesClientBlockComponent } from '@tmdjr/ngx-editorjs-blockquotes-block';
import { NgxEditorjsImageClientBlockComponent } from '@tmdjr/ngx-editorjs-image-block';
import { NgxEditorjsCodeClientBlockComponent } from '@tmdjr/ngx-editorjs-code-block';
import { NgxEditorjsQuizClientBlockComponent } from '@tmdjr/ngx-editorjs-quiz-block';
import { NgxEditorjsMermaidClientBlockComponent } from '@tmdjr/ngx-editorjs-mermaid-block';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

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
    importProvidersFrom(BrowserAnimationsModule),
    importProvidersFrom(HttpClientModule),
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: RouteReuseStrategy, useClass: WorkshopReuseStrategy },
    {
      provide: APP_INITIALIZER,
      useFactory: registerIcons,
      deps: [MatIconRegistry, DomSanitizer],
      multi: true,
    },
    {
      provide: NGX_EDITORJS_CLIENT_OPTIONS,
      useValue: {
        blocks: [
          {
            name: 'Paragraph',
            component: NgxEditorjsParagraphClientBlockComponent,
            componentInstanceName: 'NgxEditorjsParagraphBlockMediator',
          },
          {
            name: 'Blockquotes',
            component: NgxEditorjsBlockquotesClientBlockComponent,
            componentInstanceName: 'NgxEditorjsBlockquotesBlockMediator',
          },
          {
            name: 'Image',
            component: NgxEditorjsImageClientBlockComponent,
            componentInstanceName: 'NgxEditorjsImageBlockMediator',
          },
          {
            name: 'Code',
            component: NgxEditorjsCodeClientBlockComponent,
            componentInstanceName: 'NgxEditorjsCodeBlockMediator',
          },
          {
            name: 'Quiz',
            component: NgxEditorjsQuizClientBlockComponent,
            componentInstanceName: 'NgxEditorjsQuizBlockMediator',
          },
          {
            name: 'Quiz',
            component: NgxEditorjsMermaidClientBlockComponent,
            componentInstanceName: 'NgxEditorjsMermaidBlockMediator',
          },
        ],
      },
    },
  ],
};
