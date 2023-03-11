import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { HighlightLoader } from 'ngx-highlightjs';

@Component({
  selector: 'code-highlighter',
  templateUrl: './code-highlighter.component.html',
  styleUrls: ['./code-highlighter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CodeHighlighterComponent {

  @Input() code: string = '';
  @Input() language: string = 'typescript';

  themeMap: Map<string, string> = new Map([
    ['gradient-dark', 'assets/css/highlightjs-themes/gradient-dark.css'],
    ['github-dark', 'assets/css/highlightjs-themes/github-dark.css'],
    ['github', 'assets/css/highlightjs-themes/github.css']
  ]);

  constructor(private hljsLoader: HighlightLoader) { }

  changeTheme(themeColor: string): void {
    const themePath = this.themeMap.get(themeColor) ?? 'gradient-dark';
    this.hljsLoader.setTheme(themePath);
  }
}
