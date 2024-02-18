import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { NavigationService } from '../../../../../../shared/services/navigation/navigation.service';

@Component({
  selector: 'ngx-workshop-list',
  standalone: true,
  imports: [CommonModule, RouterModule, MatCardModule],
  template: `
    <div class="workshop-list">
      <!-- <mat-card 
        appearance="raised"
        *ngFor="let workshop of workshops | async" 
        [routerLink]="'../' + workshop.workshopDocumentGroupId + '/' + workshop.workshopDocuments[0]._id">
        <img mat-card-image src="/admin/assets/img/workshop-placeholder.png">
        <mat-card-content>
          <mat-card-title>{{workshop.name}}</mat-card-title>
          <mat-card-subtitle>{{workshop.summary}}</mat-card-subtitle>
        </mat-card-content>
      </mat-card> -->

      <div
        class="mat-card-new mat-mdc-card"
        *ngFor="let workshop of workshops | async"
        [routerLink]="
          '../' +
          workshop.workshopDocumentGroupId +
          '/' +
          workshop.workshopDocuments[0]._id
        "
      >
        <img mat-card-image [src]="workshop.thumbnail ?? '/assets/img/workshop-placeholder.png'" />
        <h2>{{ workshop.name }}</h2>
        <p>{{ workshop.summary }}</p>
      </div>
    </div>
  `,
  styles: [
    `
      @use '@angular/material' as mat;
      :host {
        display: flex;
        flex-direction: column;
        align-items: center;
        .workshop-list {
          display: flex;
          flex-wrap: wrap;
          gap: 24px;
          padding: 24px;
          justify-content: center;
        }
        /* TODO(mdc-migration): The following rule targets internal classes of card that may no longer apply for the MDC version. */
        mat-card {
          cursor: pointer;
          width: 312px;
          margin: 20px;
        }
      }

      .mat-card-new {
        display: flex;
        flex-direction: column;
        width: 325px;
        height: 375px;
        overflow: auto;
        border-radius: 24px;
        transition: box-shadow 0.4s;
        cursor: pointer;
        @include mat.elevation(6);

        h2 {
          font-weight: 100;
          font-stretch: condensed;
          font-size: 1.6rem;
          padding: 12px 8px;
          margin: 0;
        }

        p {
          font-size: 1rem;
          font-weight: 100;
          padding: 0px 8px;
          margin: 0 0 24px;
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkshopListComponent {
  workshops = inject(NavigationService).getWorkshops()
}
