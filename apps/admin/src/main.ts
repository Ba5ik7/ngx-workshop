import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/css/css';
import 'codemirror/mode/xml/xml';

import { bootstrapApplication } from '@angular/platform-browser';
import {
  RouteReuseStrategy,
  provideRouter,
  withEnabledBlockingInitialNavigation,
} from '@angular/router';
import { AppComponent } from './app/app.component';
import { WorkshopReuseStrategy, appRoutes } from './app/app.routes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { JwtInterceptor } from './app/shared/interceptors/jwt.interceptor';

import { NGX_EDITORJS_OPTIONS } from '@tmdjr/ngx-editorjs';
import { NgxEditorjsParagraphBlockMediator } from '@tmdjr/ngx-editorjs-paragraph-block';
import { NgxEditorjsBlockquotesBlockMediator } from '@tmdjr/ngx-editorjs-blockquotes-block';
import { NgxEditorjsImageBlockMediator } from '@tmdjr/ngx-editorjs-image-block';
import { NgxEditorjsCodeBlockMediator } from '@tmdjr/ngx-editorjs-code-block';
import { NgxEditorjsQuizBlockMediator } from '@tmdjr/ngx-editorjs-quiz-block';


bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(appRoutes, withEnabledBlockingInitialNavigation()),
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
            componentInstanceName: 'NgxEditorjsParagraphBlockMediator'
          },
          {
            name: 'Blockquotes',
            component: NgxEditorjsBlockquotesBlockMediator,
            componentInstanceName: 'NgxEditorjsBlockquotesBlockMediator'
          },
          {
            name: 'Image',
            component: NgxEditorjsImageBlockMediator,
            componentInstanceName: 'NgxEditorjsImageBlockMediator'
          },
          {
            name: 'Code',
            component: NgxEditorjsCodeBlockMediator,
            componentInstanceName: 'NgxEditorjsCodeBlockMediator'
          },
          {
            name: 'Quiz',
            component: NgxEditorjsQuizBlockMediator,
            componentInstanceName: 'NgxEditorjsQuizBlockMediator'
          }
        ]
      }
    }
  ],
}).catch((err) => console.error(err));
