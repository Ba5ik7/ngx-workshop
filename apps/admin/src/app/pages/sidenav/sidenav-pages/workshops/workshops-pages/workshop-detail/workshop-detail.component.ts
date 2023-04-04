import { Component, inject, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, tap } from 'rxjs';
import { NgxEditorjsModule, NgxEditorjsOutputBlock } from '@tmdjr/ngx-editorjs';
import { WorkshopEditorService } from '../../../../../../shared/services/workshops/workshops.service';
import { CommonModule } from '@angular/common';
import { WorkshopDocument } from '../../../../../../shared/interfaces/category.interface';

@Component({
  standalone: true,
  selector: 'ngx-workshop-detail',
  template: `
    <ng-container *ngIf="ngxEditorjsOutputBlock | async as blocks; else elseTemplate">
      <div class="workshop-detail-content">
        <div class="page">
          <section class="workshop-viewer-container">
            <div class="mat-card">
              <ngx-editorjs
                [inputData]="blocks"
                [requestValue]="requestValue"
                (valueRequested)="valueRequested($event)"
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
    workshop-detail {
      font-weight: 400;
      @media (max-width: 599px) {
        padding-left: 15px;
        padding-right: 15px;
      }
      .paginator {
        position: sticky;
        top: 0;
        z-index: 2;
      }
    }
  `],
  encapsulation: ViewEncapsulation.None,
  imports: [
    CommonModule,
    NgxEditorjsModule
  ]
})
export class WorkshopDetailComponent {
  workshopDocumentId!: string;
  private workshopEditorService = inject(WorkshopEditorService);
  ngxEditorjsOutputBlock = inject(ActivatedRoute).data.pipe(
    map((data) => data['documentResolver'] as WorkshopDocument),
    // TODO: Make it Reactive
    tap((data) => this.workshopDocumentId = data._id),
    map((data) => JSON.parse(data.html) as NgxEditorjsOutputBlock[])
  );

  // ! Worst place to put this, it saves the HTML of the editor
  requestValue = this.workshopEditorService.saveEditorDataSubject;
  valueRequested(value: unknown): void {
    try {
      const blocks = JSON.stringify(value);
      this.workshopEditorService.savePageHTML(blocks, this.workshopDocumentId)
      .subscribe({
        next: () => this.workshopEditorService.savePageHTMLSuccessSubject.next(true),
        error: () => this.workshopEditorService.savePageHTMLErrorSubject.next(true)
      });
    } catch (error) {
      throw new Error('Error parsing JSON');
    }
  }
}
