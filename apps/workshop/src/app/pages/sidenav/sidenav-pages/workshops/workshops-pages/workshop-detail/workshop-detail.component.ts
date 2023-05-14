import { Component, inject, ViewChild } from '@angular/core';
import {
  MatPaginatorModule,
  MatPaginator,
  PageEvent
} from '@angular/material/paginator';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { combineLatest, map } from 'rxjs';
import { NgxEditorjsModule } from '@tmdjr/ngx-editorjs';
import { NavigationService } from '../../../../../../shared/services/navigation/navigation.service';
import { CommonModule } from '@angular/common';
import { WorkshopDocument } from '../../../../../../shared/interfaces/navigation.interface';
import { NgxEditorjsClientModule } from '@tmdjr/ngx-editorjs-client';
import { MatCardModule } from '@angular/material/card';
import { trigger, transition, group, query, style, animate } from '@angular/animations';

export class RouterAnimations {
  static routeSlide =
    trigger('routeSlide', [
      transition('* => *', [
        group([
          query(':enter', [
            style({transform: 'translateX(100%)'}),
            animate('.4s ease-in-out', style({transform: 'translateX(0%)'}))
          ], {optional: true}),
          query(':leave', [
            style({transform: 'translateX(0%)'}),
            animate('.4s ease-in-out', style({transform: 'translateX(-100%)'}))
          ], {optional: true}),
        ])
      ]),
    ]);
}



const safeParse = (json: string) => {
  try {
    return JSON.parse(json);
  } catch (error) {
    throw new Error('Error parsing JSON');
  }
}
@Component({
  standalone: true,
  selector: 'ngx-workshop-detail',
  imports: [
    CommonModule,
    NgxEditorjsModule,
    MatCardModule,
    NgxEditorjsClientModule
  ],
  template: `
    <ng-container *ngIf="viewModel | async as vm; else elseTemplate">
      <div class="workshop-detail-content">
        <div class="page">
          <section class="workshop-viewer-container">
            <mat-card
              class="workshop-detail-card"
              appearance="raised">
              <ngx-editorjs-client [inputData]="vm.ngxEditorjsBlocks"></ngx-editorjs-client>
            </mat-card>
          </section>
        </div>
      </div>
    </ng-container>
    <ng-template #elseTemplate>
      LOADING!!!
    </ng-template>
  `,
  styles: [`
    :host {
      display: block;
    }
    .workshop-viewer-container {
      position: absolute;
      width: 100%;
      height: 100%;
      display: block;
      padding: 20px 60px;
      .workshop-detail-card {
        max-width: 750px;
        padding: 16px 56px 36px;
        transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);
        display: block;
        position: relative;
        border-radius: 4px;
        margin-bottom: 22px;
      }
      h1 {
        padding: 0.6em 0 3px
      }
      p {
        line-height: 1.6em;
      }
    }
  `]
})
export class WorkshopDetailComponent {
  viewModel = combineLatest([
    inject(ActivatedRoute).data
  ]).pipe(
    map(([blocks]) => {
      return {
        document: blocks['documentResolver'] as WorkshopDocument
      }
    }),
    map(({ document }) => {
      return {
        ngxEditorjsBlocks: safeParse(document.html),
      };
    })
  );
}


@Component({
  standalone: true,
  selector: 'ngx-workshop-detail-animation',
  animations: [ RouterAnimations.routeSlide ],
  imports: [
    RouterModule,
    CommonModule,
    MatPaginatorModule
  ],
  template: `
    <ng-container *ngIf="viewModel | async as vm; else elseTemplate">
      <mat-paginator
        *ngIf="vm.hasMoreThanOneDocument"
        #paginator
        class="paginator"
        [length]="vm.workshopDocumentsLength"
        [showFirstLastButtons]="true"
        [hidePageSize]="true"
        [pageSize]="1"
        [pageIndex]="vm.pageIndex"
        (page)="vm.pageEventChange($event)"
        aria-label="Select page">
      </mat-paginator>
      <div [@routeSlide]="vm.document" class="container">
        <router-outlet></router-outlet>
      </div>
    </ng-container>
    <ng-template #elseTemplate>
      LOADING!!!
    </ng-template>
  `,
  styles: [`
    .container {
      overflow: hidden;
      width: 100%;
      height: 100%;
      position: relative;
    }
    .paginator {
      position: sticky;
      top: 0;
      z-index: 2;
    }
  `]
})
export class WorkshopDetailAnimationComponent {
  @ViewChild('paginator') paginator!: MatPaginator;

  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);

  viewModel = combineLatest([
    inject(NavigationService).getWorkshopDocument(),
    inject(NavigationService).getCurrentWorkshop()
  ]).pipe(
    map(([blocks, workshop]) => {
      return {
        document: blocks as WorkshopDocument,
        documents: workshop?.workshopDocuments
      }
    }),
    map(({ document, documents = [] }) => {
      return {
        document,
        hasMoreThanOneDocument: documents.length > 1,
        workshopDocumentsLength: documents.length,
        pageIndex: documents.findIndex((workshopDocument) => workshopDocument._id === document._id),
        pageEventChange: ({ pageIndex }: PageEvent) => {
          this.router.navigate(['./', documents[pageIndex]._id], { relativeTo: this.activatedRoute });
        }
      };
    })
  );
}
