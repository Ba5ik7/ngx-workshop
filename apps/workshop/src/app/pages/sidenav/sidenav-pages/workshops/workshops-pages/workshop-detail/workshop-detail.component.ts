import { Component, inject, ViewChild } from '@angular/core';
import {
  MatPaginatorModule,
  MatPaginator,
  PageEvent,
} from '@angular/material/paginator';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import {
  BehaviorSubject,
  combineLatest,
  map,
  pairwise,
  startWith,
  tap,
} from 'rxjs';
import { NgxEditorJs2Component } from '@tmdjr/ngx-editor-js2';
import { NavigationService } from '../../../../../../shared/services/navigation/navigation.service';
import { CommonModule } from '@angular/common';
import { WorkshopDocument } from '../../../../../../shared/interfaces/navigation.interface';
import { MatCardModule } from '@angular/material/card';
import {
  trigger,
  transition,
  group,
  query,
  style,
  animate,
} from '@angular/animations';

export class RouterAnimations {
  static routeSlide = trigger('routeSlide', [
    transition('* <=> *', [
      group([
        query(
          ':enter',
          [
            style({ transform: 'translateX({{offsetEnter}}%)', width: '100%' }),
            animate('0.4s ease-in-out', style({ transform: 'translateX(0%)' })),
            style({ position: 'relative' }),
          ],
          { optional: true }
        ),
        query(
          ':leave',
          [
            style({ transform: 'translateX(0%)', width: '100%' }),
            animate(
              '0.4s ease-in-out',
              style({ transform: 'translateX({{offsetLeave}}%)' })
            ),
            style({ position: 'relative' }),
          ],
          { optional: true }
        ),
      ]),
    ]),
  ]);

  static routeCubeRotation = trigger('routeCubeRotation', [
    transition('* <=> *', [
      group([
        query(
          ':enter',
          [
            style({
              transform: 'translateX({{offsetEnter}}%) rotateY(-90deg)',
              transformOrigin: 'left',
              position: 'absolute',
              width: '100%',
            }),
            animate(
              '0.4s ease-in-out',
              style({ transform: 'translateX(0%) rotateY(0deg)' })
            ),
            style({ position: 'relative' }),
          ],
          { optional: true }
        ),
        query(
          ':leave',
          [
            style({
              transform: 'translateX(0%) rotateY(0deg)',
              transformOrigin: 'right',
              position: 'absolute',
              width: '100%',
            }),
            animate(
              '0.4s ease-in-out',
              style({
                transform: 'translateX({{offsetLeave}}%) rotateY(90deg)',
              })
            ),
            style({ position: 'relative' }),
          ],
          { optional: true }
        ),
      ]),
    ]),
  ]);
}

const safeParse = (json: string) => {
  try {
    return JSON.parse(json);
  } catch (error) {
    throw new Error('Error parsing JSON');
  }
};
@Component({
  selector: 'ngx-workshop-detail',
  imports: [
    CommonModule,
    MatCardModule,
    NgxEditorJs2Component,
  ],
  template: `
    <ng-container *ngIf="viewModel | async as vm; else elseTemplate">
      <div class="workshop-detail-content">
        <div class="page">
          <div class="workshop-viewer-container">
            <div class="workshop-detail-card mat-elevation-z12">
              <ngx-editor-js2
                [blocks]="vm.ngxEditorjsBlocks"
                [requestBlocks]="requestBlocks$ | async"
                (blocksRequested)="handleBlocks($event)"
              ></ngx-editor-js2>
            </div>
          </div>
        </div>
      </div>
    </ng-container>
    <ng-template #elseTemplate> LOADING!!! </ng-template>
  `,
  styles: [
    `
      @use '@angular/material' as mat;
      :host {
        display: block;
      }
      .workshop-viewer-container {
        padding: 62px;
        @media (max-width: 720px) {
          padding: 15px 10px;
        }
        .workshop-detail-card {
          display: block;
          position: relative;
          max-width: 600px;
          padding: 32px 32px 56px;
          margin-bottom: 22px;
          border-radius: 24px;
          // border: 0.5px solid var(--mat-sys-primary);
          color: var(--mat-sys-on-secondary-container);
          background-color: var(--mat-sys-secondary-container);
          @media (max-width: 720px) {
            padding: 15px;
          }
        }
      }
    `,
  ],
})
export class WorkshopDetailComponent {
  viewModel = combineLatest([inject(ActivatedRoute).data]).pipe(
    map(([blocks]) => {
      return {
        document: blocks['documentResolver'] as WorkshopDocument,
      };
    }),
    map(({ document }) => {
      return {
        ngxEditorjsBlocks: safeParse(document.html),
      };
    })
  );

  requestBlocks = new BehaviorSubject<{}>({});
  requestBlocks$ = this.requestBlocks.asObservable();

  handleBlocks(blocks$: any) {
    // console.log(blocks$);
  }
}

@Component({
  selector: 'ngx-workshop-detail-animation',
  animations: [RouterAnimations.routeSlide, RouterAnimations.routeCubeRotation],
  imports: [CommonModule, RouterModule, MatPaginatorModule],
  template: `
  @if (viewModel | async; as vm) {
    <ng-container>
      @if (vm.hasMoreThanOneDocument) {
        <mat-paginator
          #paginator
          class="paginator"
          [length]="vm.workshopDocumentsLength"
          [showFirstLastButtons]="true"
          [hidePageSize]="true"
          [pageSize]="1"
          [pageIndex]="vm.pageIndex"
          (page)="vm.pageEventChange($event)"
          aria-label="Select page"
        >
        </mat-paginator>
      }
      <div [@routeCubeRotation]="routeTrigger$ | async" class="container">
        <router-outlet></router-outlet>
      </div>
    </ng-container>
  } @else {
    <ng-template> LOADING!!! </ng-template>
  }

  `,
  styles: [
    `
      @use '@angular/material' as mat;
      .container {
        perspective: 2500px;
        overflow: hidden;
        width: 100%;
        height: calc(100% - 48px);
      }
      .paginator {
        position: sticky;
        top: 0;
        z-index: 2;
        color: var(--mat-sys-primary-container);
        background-color: var(--mat-sys-primary);
        @include mat.paginator-overrides(
          (
            enabled-icon-color: var(--mat-sys-primary-container),
          )
        );
      }
      ::ng-deep .mat-mdc-paginator-container {
        min-height: 48px;
      }
    `,
  ],
})
export class WorkshopDetailAnimationComponent {
  @ViewChild('paginator') paginator!: MatPaginator;

  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  routeTrigger = new BehaviorSubject<number>(0);
  routeTrigger$ = this.routeTrigger.asObservable().pipe(
    startWith(0),
    pairwise(),
    map(([prev, curr]) => ({
      value: curr,
      params: {
        offsetEnter: prev > curr ? -100 : 100,
        offsetLeave: prev > curr ? 100 : -100,
      },
    }))
  );

  viewModel = combineLatest([
    inject(NavigationService).getWorkshopDocument(),
    inject(NavigationService).getCurrentWorkshop(),
  ]).pipe(
    map(([blocks, workshop]) => {
      return {
        document: blocks as WorkshopDocument,
        documents: workshop?.workshopDocuments,
      };
    }),
    map(({ document, documents = [] }) => {
      return {
        document,
        hasMoreThanOneDocument: documents.length > 1,
        workshopDocumentsLength: documents.length,
        pageIndex: documents.findIndex(
          (workshopDocument) => workshopDocument._id === document._id
        ),
        pageEventChange: ({ pageIndex }: PageEvent) => {
          this.router.navigate(['./', documents[pageIndex]._id], {
            relativeTo: this.activatedRoute,
          });
        },
      };
    }),
    tap(({ pageIndex }) => this.routeTrigger.next(pageIndex))
  );
}
