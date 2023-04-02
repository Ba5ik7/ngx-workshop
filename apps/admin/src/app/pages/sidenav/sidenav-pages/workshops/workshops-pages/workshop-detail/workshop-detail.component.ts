import { Component, inject, OnDestroy, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatLegacyPaginator as MatPaginator, LegacyPageEvent as PageEvent } from '@angular/material/legacy-paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { WorkshopDocument } from '../../../../../../shared/interfaces/workshop-document.interface';
import { combineLatest, map, of, Subject, switchMap, take, takeUntil, tap } from 'rxjs';
import { Workshop } from '../../../../../../shared/interfaces/category.interface';
import { NavigationService } from '../../../../../../shared/services/navigation/navigation.service';
import { NgxEditorjsOutputBlock } from '@tmdjr/ngx-editorjs';
import { WorkshopEditorService } from '../../../../../../shared/services/workshops/workshops.service';

@Component({
  selector: 'ngx-workshop-detail',
  templateUrl: './workshop-detail.component.html',
  styleUrls: ['./workshop-detail.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class WorkshopDetailComponent {

  // destory: Subject<boolean> = new Subject();
  // workshopDocument = '';
  // workshopDocumentsLength = 0;
  // hasMoreThanOneDocument = false;
  // workshopDocuments: Workshop[] = [];
  // hasWorkshopId = false;

  private workshopEditorService = inject(WorkshopEditorService);
  ngxEditorjsOutputBlock = inject(ActivatedRoute).data.pipe(
    map((data) => data['documentResolver']),
    map((data) => JSON.parse(data.html) as NgxEditorjsOutputBlock[])
  );

  requestValue = this.workshopEditorService.saveEditorDataSubject;

  valueRequested(value: unknown): void {
    console.log({ value });
    // this.workshopEditorService.savePageHTML(JSON.stringify(value), this.currentDocument);
  }

  // @ViewChild('paginator') paginator!: MatPaginator;

  // constructor(
  //   private activatedRoute: ActivatedRoute,
  //   private navigationService: NavigationService,
  //   private router: Router) {
  //     this.activatedRoute.params
  //     .pipe(
  //       tap((params) => this.navigationService.categoryRouteSub.next(params['categoryId'])),
  //       switchMap((params) => (
  //         combineLatest({
  //           params: of(params),
  //           workshopDocuments: this.navigationService.workshopDocuments$
  //         })
  //       )),
  //       takeUntil(this.destory),
  //     )
  //     .subscribe(({ params, workshopDocuments }) => {
  //       if(!workshopDocuments) return;
  
  //       this.workshopDocuments = workshopDocuments;
  //       if(params['workshopId']) {
  //         this.workshopDocument = params['workshopId'];
  //         this.setPaginatorIndex();
  //       } else { 
  //         this.workshopDocument = workshopDocuments[0]._id!;
  //       }
  
  //       this.hasMoreThanOneDocument = workshopDocuments.length > 1;
  //       this.workshopDocumentsLength = workshopDocuments.length;
  //     });
  // }

  // ngOnDestroy(): void {
  //   this.destory.next(true);
  // }

  // pageEventChange({ pageIndex }: PageEvent) {
  //   this.router.navigate([this.hasWorkshopId ? '../': './', this.workshopDocuments[pageIndex]._id], { relativeTo: this.activatedRoute });
  // }

  // setPaginatorIndex() {
  //   requestAnimationFrame(() => {
  //     this.hasWorkshopId = true;
  //     this.paginator.pageIndex = this.workshopDocuments.findIndex((workshopDocument) => workshopDocument._id === this.workshopDocument);
  //   });
  // }
}
