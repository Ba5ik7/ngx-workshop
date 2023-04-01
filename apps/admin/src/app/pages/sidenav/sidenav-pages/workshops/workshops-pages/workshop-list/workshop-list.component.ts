import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Workshop } from '../../../../../../shared/interfaces/category.interface';
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
    <div class="workshop-list-summary">
      <div>This is the summary of the workshops under this section.</div>
    </div>
    <div class="workshop-category-list">
      <mat-card 
        *ngFor="let workshop of workshops | async" 
        [routerLink]="'../' + workshop.worshopDocumentGroupId">
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
    }

    .workshop-workshop-list-summary {
      padding: 25px 40px 0;
      font-size: 18px;
      line-height: 1.5;
      display: flex;
      justify-content: center;
    }

    @media (max-width: 1255px) {
      .workshop-workshop-list-summary {
        max-width: 600px;
      }
    }

    @media (max-width: 694px) {
      .workshop-workshop-list-summary {
        max-width: 280px;
      }
    }

    .workshop-workshop-list {
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
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkshopListComponent {
  workshops = inject(NavigationService).getWorkshops();
}
