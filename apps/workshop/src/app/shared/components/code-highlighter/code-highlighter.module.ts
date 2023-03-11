import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CodeHighlighterComponent } from './code-highlighter.component';
import { HighlightModule } from 'ngx-highlightjs';



@NgModule({
  declarations: [
    CodeHighlighterComponent
  ],
  exports: [CodeHighlighterComponent],
  imports: [
    CommonModule,
    HighlightModule
  ]
})
export class CodeHighlighterModule { }
