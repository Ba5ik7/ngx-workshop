import { appConfig } from './app/app.config';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/css/css';
import 'codemirror/mode/xml/xml';

import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';

import { JwtInterceptor } from './app/shared/interceptors/jwt.interceptor';

import { NGX_EDITORJS_CLIENT_OPTIONS } from '@tmdjr/ngx-editorjs-client';
import { NgxEditorjsParagraphClientBlockComponent } from '@tmdjr/ngx-editorjs-paragraph-block';
import { NgxEditorjsBlockquotesClientBlockComponent } from '@tmdjr/ngx-editorjs-blockquotes-block';
import { NgxEditorjsImageClientBlockComponent } from '@tmdjr/ngx-editorjs-image-block';
import { NgxEditorjsCodeClientBlockComponent } from '@tmdjr/ngx-editorjs-code-block';
import { NgxEditorjsQuizClientBlockComponent } from '@tmdjr/ngx-editorjs-quiz-block';
import { NgxEditorjsMermaidClientBlockComponent } from '@tmdjr/ngx-editorjs-mermaid-block';

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err)
);
