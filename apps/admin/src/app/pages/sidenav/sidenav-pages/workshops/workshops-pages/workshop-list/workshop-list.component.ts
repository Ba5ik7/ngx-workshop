import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card'
import { map } from 'rxjs';
import { NavigationService } from '../../../../../../shared/services/navigation/navigation.service';
import { ImageUploaderComponent } from '../../../../../../shared/components/image-uploader/image-uploader.component';

@Component({
  selector: 'ngx-workshop-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    NgOptimizedImage,
    ImageUploaderComponent
  ],
  template: `
    <div class="workshop-list">
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
        <div class="img-wrapper">
          <img [ngSrc]="workshop.thumbnail ?? '/assets/img/workshop-placeholder.png'" fill />
        </div>
        <h2>{{ workshop.name }}</h2>
        <p>{{ workshop.summary }}</p>
      </div>
    </div>
  `,
  styles: [`
    @use '@angular/material' as mat;
      :host {
        display: flex;
        flex-direction: column;
        align-items: center;

        .image-uploader-cta {
          position: absolute;
          top: 10px;
          left: 10px;
        }

        .workshop-list {
          display: flex;
          flex-wrap: wrap;
          gap: 24px;
          padding: 24px;
          justify-content: center;
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

        .img-wrapper {
          position: relative;
          width: 100%;
          height: 50%;
          img {
            object-fit: contain;
          }
        }

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
  workshops = inject(NavigationService).getWorkshops().pipe(
    map((workshops) => workshops.sort((a, b) => a.sortId - b.sortId))
  );
}
