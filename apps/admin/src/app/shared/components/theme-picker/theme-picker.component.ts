import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { ThemePickerService } from '../../services/theme-picker/theme-picker.service';

import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyMenuModule as MatMenuModule } from '@angular/material/legacy-menu';
import { MatLegacyTooltipModule as MatTooltipModule } from '@angular/material/legacy-tooltip';
import { DomSanitizer } from '@angular/platform-browser';

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
  template: `
    <ng-container *ngIf="currentTheme$ | async as currentTheme">
      <button mat-button [mat-menu-trigger-for]="themeMenu" [matTooltip]="matTooltipTest">
        {{ currentTheme | uppercase }}
        <mat-icon class="dropdown-icon">format_color_fill</mat-icon>
      </button>
    
      <mat-menu #themeMenu="matMenu" class="theme-picker-menu">
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
    </ng-container>
    
  `,
  styleUrls: ['./theme-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class ThemePickerComponent {

  matTooltipTest = 'Select a theme for the documentation';
  currentTheme$ = this.themePickerService.currentTheme$;
  themes: Map<string, string> = new Map([
    ['indigo-amber', 'Light'],
    ['indigo-pink', 'Dark'],
    ['professional', 'Professional'],
    // ['educational', 'Educational'],
    ['synthwave', 'Synthwave'],
    ['winter', 'Winter'],
    ['spring', 'Spring'],
    ['summer', 'Summer'],
    ['fall', 'Fall'],
    // ['fun', 'Fun'],
    // ['pink-bluegrey', 'Pink & Blue-grey'],
    // ['purple-green', 'Purple & Green']
  ]);

  constructor(
      private themePickerService: ThemePickerService,
      iconRegistry: MatIconRegistry,
      sanitizer: DomSanitizer
  ) {
    const themeExampleIconURL = sanitizer.bypassSecurityTrustResourceUrl(ThemePickerService.THEME_EXAMPLE_ICON);
    iconRegistry.addSvgIcon('theme-example', themeExampleIconURL);
  }

  selectTheme(theme: string): void {
    this.themePickerService.setStyle('theme', `${theme}.css`);
    this.themePickerService.storeTheme(theme);
    this.currentTheme$.next(theme);
  }
}
