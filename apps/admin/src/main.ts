import { appConfig } from './app/app.config';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/css/css';
import 'codemirror/mode/xml/xml';

import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';

import { JwtInterceptor } from './app/shared/interceptors/jwt.interceptor';

import { NGX_EDITORJS_OPTIONS } from '@tmdjr/ngx-editorjs';
import { NgxEditorjsParagraphBlockMediator } from '@tmdjr/ngx-editorjs-paragraph-block';
import { NgxEditorjsBlockquotesBlockMediator } from '@tmdjr/ngx-editorjs-blockquotes-block';
import { NgxEditorjsImageBlockMediator } from '@tmdjr/ngx-editorjs-image-block';
import { NgxEditorjsCodeBlockMediator } from '@tmdjr/ngx-editorjs-code-block';
import { NgxEditorjsQuizBlockMediator } from '@tmdjr/ngx-editorjs-quiz-block';
import { NgxEditorjsMermaidBlockMediator } from '@tmdjr/ngx-editorjs-mermaid-block';

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err)
);
