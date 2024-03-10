import { ApplicationConfig } from '@angular/core';
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

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes, withEnabledBlockingInitialNavigation()),
    provideMarkdown(),
    importProvidersFrom(BrowserAnimationsModule),
    importProvidersFrom(HttpClientModule),
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: RouteReuseStrategy, useClass: WorkshopReuseStrategy },
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
