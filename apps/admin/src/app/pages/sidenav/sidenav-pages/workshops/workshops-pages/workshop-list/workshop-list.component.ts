import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card'
import { NavigationService } from '../../../../../../shared/services/navigation/navigation.service';

@Component({
  selector: 'ngx-workshop-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule
  ],
  template: `
    <div class="workshop-list">
      <mat-card 
        *ngFor="let workshop of workshops | async" 
        [routerLink]="'../' + workshop._id">
        <img mat-card-image src="/admin/assets/img/workshop-placeholder.png">
        <mat-card-title>{{workshop.name}}</mat-card-title>
        <mat-card-subtitle>{{workshop.summary}}</mat-card-subtitle>
      </mat-card>
    </div>
  `,
  styles: [`
    :host {
      display: flex;
      flex-direction: column;
      align-items: center;
      .workshop-list {
        display: flex;
        flex-wrap: wrap;
        padding: 20px;
        justify-content: center;
      }
      mat-card {
        cursor: pointer;
        width: 280px;
        margin: 20px;
        vertical-align: top;
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkshopListComponent {
  workshops = inject(NavigationService).getWorkshops();
}
