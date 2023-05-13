import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card'
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
        appearance="raised"
        *ngFor="let workshop of workshops | async" 
        [routerLink]="'../' + workshop.workshopDocumentGroupId + '/' + workshop.workshopDocuments[0]._id">
        <img mat-card-image src="/admin/assets/img/workshop-placeholder.png">
        <mat-card-content>
          <mat-card-title>{{workshop.name}}</mat-card-title>
          <mat-card-subtitle>{{workshop.summary}}</mat-card-subtitle>
        </mat-card-content>
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
      /* TODO(mdc-migration): The following rule targets internal classes of card that may no longer apply for the MDC version. */
      mat-card {
        cursor: pointer;
        width: 312px;
        margin: 20px;
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkshopListComponent {
  workshops = inject(NavigationService).getWorkshops();
}
