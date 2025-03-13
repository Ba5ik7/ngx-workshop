import { Component, inject, ViewChild } from '@angular/core';
import {
  MatPaginatorModule,
  MatPaginator,
  PageEvent,
} from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import {
  catchError,
  combineLatest,
  defaultIfEmpty,
  filter,
  lastValueFrom,
  map,
  Observable,
  of,
  switchMap,
  tap,
} from 'rxjs';
import { WorkshopEditorService } from '../../../../../../shared/services/workshops/workshops.service';
import { NavigationService } from '../../../../../../shared/services/navigation/navigation.service';
import { CommonModule } from '@angular/common';
import { WorkshopDocument } from '../../../../../../shared/interfaces/navigation.interface';
import { MatCardModule } from '@angular/material/card';
import { NgxEditorJs2Component, NgxEditorJsBlock } from '@tmdjr/ngx-editor-js2';

const safeParse = (json: string) => {
  try {
    return JSON.parse(json);
  } catch (error) {
    throw new Error('Error parsing JSON');
  }
};

const safeStringify = (value: unknown) => {
  try {
    return JSON.stringify(value);
  } catch (error) {
    throw new Error('Error stringify JSON');
  }
};
@Component({
  selector: 'ngx-workshop-detail',
  imports: [
    CommonModule,
    MatPaginatorModule,
    MatCardModule,
    NgxEditorJs2Component,
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
        aria-label="Select page"
      >
      </mat-paginator>
      <div class="workshop-detail-content">
        <div class="page">
          <div class="workshop-viewer-container">
            <div class="workshop-detail-card ngx-mat-card">
              <!-- {{ vm.isExam ? 'Exam' : 'Page' }} -->
              <ngx-editor-js2
                [blocks]="vm.ngxEditorjsBlocks"
                [requestBlocks]="requestValue | async"
                (blocksRequested)="vm.handleSavingBlocks($event)"
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
      .workshop-viewer-container {
        display: block;
        padding: 12px 60px;

        .workshop-detail-card {
          max-width: 750px;
          padding: 16px 56px 36px;
          transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);
          display: block;
          position: relative;
          margin-bottom: 22px;
        }
      }
      .paginator {
        position: sticky;
        top: 0;
        z-index: 2;
      }
    `,
  ],
})
export class WorkshopDetailComponent {
  @ViewChild('paginator') paginator!: MatPaginator;

  private workshopEditorService = inject(WorkshopEditorService);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);

  requestValue = this.workshopEditorService.saveEditorData$;

  viewModel = combineLatest([
    inject(ActivatedRoute).data,
    inject(NavigationService).getCurrentWorkshop(),
  ]).pipe(
    map(([blocks, workshop]) => {
      return {
        document: blocks['documentResolver'] as WorkshopDocument,
        documents: workshop?.workshopDocuments,
      };
    }),
    map(({ document, documents = [] }) => {
      return {
        ngxEditorjsBlocks: safeParse(document.html),
        hasMoreThanOneDocument: documents.length > 1,
        workshopDocumentsLength: documents.length,
        isExam: document.pageType === 'EXAM',
        pageIndex: documents.findIndex(
          (workshopDocument) => workshopDocument._id === document._id
        ),
        pageEventChange: ({ pageIndex }: PageEvent) => {
          this.router.navigate(['../', documents[pageIndex]._id], {
            relativeTo: this.activatedRoute,
          });
        },
        handleSavingBlocks: (blocks$: Observable<NgxEditorJsBlock[]>) => {
          void lastValueFrom(
            blocks$.pipe(
              switchMap((blocks) =>
                this.workshopEditorService.savePageHTML(
                  safeStringify(blocks),
                  document._id
                )
              ),
              tap(() =>
                this.workshopEditorService.savePageHTMLSuccessSubject.next(true)
              ),
              catchError(() => {
                this.workshopEditorService.savePageHTMLErrorSubject.next(true);
                return of([]);
              })
            )
          );
        },
      };
    })
  );
}
