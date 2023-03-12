import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { ThemePickerService } from './theme-picker.service';

import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyMenuModule as MatMenuModule } from '@angular/material/legacy-menu';
import { MatLegacyTooltipModule as MatTooltipModule } from '@angular/material/legacy-tooltip';

@Component({
  standalone: true,
  selector: 'ngx-theme-picker',
  imports: [
    CommonModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatTooltipModule
  ],
  providers: [ThemePickerService],
  template: `
    <button mat-icon-button
            [mat-menu-trigger-for]="themeMenu"
            matTooltip="Select a theme for the documentation">
      <mat-icon>format_color_fill</mat-icon>
    </button>

    <mat-menu #themeMenu="matMenu" xPosition="before" class="theme-picker-menu">
      <button mat-menu-item *ngFor="let theme of themes | keyvalue" (click)="selectTheme(theme.key)">
        <mat-icon 
          [ngClass]="{'docs-theme-selected-icon': currentTheme === theme.key}"
          [color]="currentTheme === theme.key ? 'accent' : undefined">
          {{currentTheme === theme.key ? 'radio_button_checked' : 'radio_button_unchecked'}}
        </mat-icon>
        <span>{{theme.value}}</span>
        <mat-icon [class]="'theme-example-icon ' + theme.key" svgIcon="theme-example"></mat-icon>
      </button>
    </mat-menu>
  `,
  styleUrls: ['./theme-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class ThemePickerComponent {

  currentTheme: string | undefined;
  themes: Map<string, string> = new Map([
    ['deeppurple-amber', 'Deep Purple & Amber'],
    ['indigo-pink', 'Indigo & Pink'],
    ['pink-bluegrey', 'Pink & Blue-grey'],
    ['purple-green', 'Purple & Green']
  ]);

  constructor(
      private themePickerService: ThemePickerService,
      iconRegistry: MatIconRegistry,
      sanitizer: DomSanitizer
  ) {
    const themeExampleIconURL = sanitizer.bypassSecurityTrustResourceUrl(ThemePickerService.THEME_EXAMPLE_ICON);
    iconRegistry.addSvgIcon('theme-example', themeExampleIconURL);

    const themeName = themePickerService.getStoredThemeName();
    this.selectTheme(themeName.value !== ThemePickerService.NOT_FOUND ? themeName.value : ThemePickerService.DEFAULT_THEME);
  }

  selectTheme(theme: string): void {
    this.themePickerService.setStyle('theme', `${theme}.css`);
    this.themePickerService.storeTheme(theme);
    this.currentTheme = theme;
  }
}
