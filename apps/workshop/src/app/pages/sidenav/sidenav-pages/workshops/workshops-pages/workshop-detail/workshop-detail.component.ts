import { Component, inject, ViewChild, ViewEncapsulation } from '@angular/core';
import {
  MatLegacyPaginatorModule as MatPaginatorModule,
  MatLegacyPaginator as MatPaginator,
  LegacyPageEvent as PageEvent
} from '@angular/material/legacy-paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, map } from 'rxjs';
import { NgxEditorjsModule } from '@tmdjr/ngx-editorjs';
import { WorkshopEditorService } from '../../../../../../shared/services/workshops/workshops.service';
import { NavigationService } from '../../../../../../shared/services/navigation/navigation.service';
import { CommonModule } from '@angular/common';
import { WorkshopDocument } from '../../../../../../shared/interfaces/navigation.interface';


const safeParse = (json: string) => {
  try {
    return JSON.parse(json);
  } catch (error) {
    throw new Error('Error parsing JSON');
  }
}

const safeStringify = (value: unknown) => {
  try {
    return JSON.stringify(value);
  } catch (error) {
    throw new Error('Error stringify JSON');
  }
}
@Component({
  standalone: true,
  selector: 'ngx-workshop-detail',
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
        (page)="vm.pageEventChange($event)"
        aria-label="Select page">
      </mat-paginator>
      <div class="workshop-detail-content">
        <div class="page">
          <section class="workshop-viewer-container">
            <div class="mat-card">
              <ngx-editorjs
                [inputData]="vm.ngxEditorjsBlocks"
                [requestValue]="requestValue"
                (valueRequested)="vm.valueRequested($event)"
              ></ngx-editorjs>
            </div>
          </section>
        </div>
      </div>
    </ng-container>
    <ng-template #elseTemplate>
      LOADING!!!
    </ng-template>
  `,
  styles: [`
    .workshop-viewer-container {
      display: block;
      padding: 20px 60px;
      .mat-card {
        max-width: 650px;
        padding: 16px 56px 36px 56px;
      }
      h1 {
        padding: 0.6em 0 3px
      }
      p {
        line-height: 1.6em;
      }
    }
    .paginator {
      position: sticky;
      top: 0;
      z-index: 2;
    }
    workshop-detail {
      font-weight: 400;
      @media (max-width: 599px) {
        padding-left: 15px;
        padding-right: 15px;
      }
    }
  `],
  encapsulation: ViewEncapsulation.None,
  imports: [
    CommonModule,
    NgxEditorjsModule,
    MatPaginatorModule
  ]
})
export class WorkshopDetailComponent {
  @ViewChild('paginator') paginator!: MatPaginator;

  private workshopEditorService = inject(WorkshopEditorService);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);

  requestValue = this.workshopEditorService.saveEditorDataSubject;

  viewModel = combineLatest([
    inject(ActivatedRoute).data,
    inject(NavigationService).getCurrentWorkshop()
  ]).pipe(
    map(([blocks, workshop]) => {
      return {
        document: blocks['documentResolver'] as WorkshopDocument,
        documents: workshop?.workshopDocuments
      }
    }),
    map(({ document, documents = [] }) => {
      return {
        ngxEditorjsBlocks: safeParse(document.html),
        hasMoreThanOneDocument: documents.length > 1,
        workshopDocumentsLength: documents.length,
        pageIndex: documents.findIndex((workshopDocument) => workshopDocument._id === document._id),
        pageEventChange: ({ pageIndex }: PageEvent) => {
          this.router.navigate(['../', documents[pageIndex]._id], { relativeTo: this.activatedRoute });
        },
        valueRequested: (value: unknown) => {
          try {
            const blocks = safeStringify(value);
            this.workshopEditorService.savePageHTML(blocks, document._id)
            .subscribe({
              next: () => this.workshopEditorService.savePageHTMLSuccessSubject.next(true),
              error: () => this.workshopEditorService.savePageHTMLErrorSubject.next(true)
            });
          } catch (error) {
            throw new Error('Error parsing JSON');
          }
        }
      };
    })
  );
}
