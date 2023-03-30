import { Component } from '@angular/core';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { ThemePickerComponent } from '../../../../shared/components/theme-picker/theme-picker.component';
@Component({
  standalone: true,
  selector: 'ngx-settings',
  template: `
    <main class="wrapper">
      <mat-card class="card-content">
        <h2>Settings</h2>
        <mat-card-content>
          <h3>Set theme: <ngx-theme-picker></ngx-theme-picker></h3>
        </mat-card-content>
      </mat-card>
    </main>
    `,
    styles: [`
      .wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 64px;
      }
      .card-content {
        display: flex;
        flex-direction: column;
        min-width: 720px;
      }
    `],
    imports: [
      MatCardModule,
      ThemePickerComponent
    ]
})
export class SettingsComponent { }
