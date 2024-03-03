import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { NavigationService } from '../../../../../../shared/services/navigation/navigation.service';
import { animate, keyframes, query, stagger, style, transition, trigger } from '@angular/animations';
import { map } from 'rxjs';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'optimizeCloudinaryUrl', standalone: true })
export class OptimizeCloudinaryUrlPipe implements PipeTransform {
  transform(url: string): string {
    const parts = url.split('/upload/');
    return `${parts[0]}/upload/w_650,q_auto:best,f_auto/${parts[1]}`;
  }
}
@Component({
  selector: 'ngx-workshop-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    NgOptimizedImage,
    OptimizeCloudinaryUrlPipe
  ],
  animations: [
    trigger('staggerCircleReveal', [
      transition(':enter', [
        query('.mat-card-new', [
          style({ opacity: 0, marginTop: '100px'}),
          stagger('150ms', [
            animate('0.6s ease-in-out', keyframes([
              style({ opacity: 0, marginTop: '15px', clipPath: 'circle(0% at 85% 85%)', offset: 0 }), // top left
              style({ opacity: 1, marginTop: '0', clipPath: 'circle(200% at 0% 0%)', offset: 1.0 }) // top left
            ]))
          ])
        ], { optional: true })
      ]),
      transition(':leave', [
        animate(600, style({ opacity: 0 }))
      ])
    ])
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="workshop-list" [@staggerCircleReveal]>
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
          <img [ngSrc]="workshop.thumbnail | optimizeCloudinaryUrl" fill />
        </div>
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
})
export class WorkshopListComponent {
  workshops = inject(NavigationService).getWorkshops().pipe(
    map((workshops) => workshops.sort((a, b) => a.sortId - b.sortId))
  );
}
