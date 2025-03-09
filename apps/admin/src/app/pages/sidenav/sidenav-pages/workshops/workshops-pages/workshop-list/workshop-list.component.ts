import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card'
import { map, tap } from 'rxjs';
import { NavigationService } from '../../../../../../shared/services/navigation/navigation.service';
import { ImageUploaderComponent } from '../../../../../../shared/components/image-uploader/image-uploader.component';
import { Pipe, PipeTransform } from '@angular/core';
import { animate, keyframes, query, stagger, style, transition, trigger } from '@angular/animations';


@Pipe({ name: 'optimizeCloudinaryUrl', standalone: true })
export class OptimizeCloudinaryUrlPipe implements PipeTransform {
  transform(url: string): string {
    const parts = url.split('/upload/');
    return `${parts[0]}/upload/w_650,q_auto:best,f_auto/${parts[1]}`;
  }
}

@Component({
    selector: 'ngx-workshop-list',
    imports: [
        CommonModule,
        RouterModule,
        MatCardModule,
        NgOptimizedImage,
        ImageUploaderComponent,
        OptimizeCloudinaryUrlPipe
    ],
    animations: [
        trigger('staggerCircleReveal', [
            transition(':enter', [
                query('.ngx-mat-card', [
                    style({ opacity: 0, marginTop: '100px' }),
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
    template: `
    <div class="workshop-list" [@staggerCircleReveal]>
      <div
        class="ngx-mat-card"
        *ngFor="let workshop of workshops | async"
        [routerLink]="
          '../' +
          workshop.workshopDocumentGroupId +
          '/' +
          workshop.workshopDocuments[0]._id
        "
      >
        <div class="img-wrapper">
          <img [ngSrc]="workshop.thumbnail | optimizeCloudinaryUrl" priority fill />
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

      .ngx-mat-card {
        width: 325px;
        height: 375px;
        overflow: auto;
        cursor: pointer;
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
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkshopListComponent {
  workshops = inject(NavigationService).getWorkshops().pipe(
    map((workshops) => workshops.sort((a, b) => a.sortId - b.sortId)),
    tap(() => window.document.body.scrollTo(0, 0))
  );
}
