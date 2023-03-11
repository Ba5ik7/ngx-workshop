import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatLegacyPaginator as MatPaginator } from '@angular/material/legacy-paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, filter, map, of, switchMap, tap } from 'rxjs';
// import { TableOfContentsComponent } from 'src/app/shared/components/table-of-contents/table-of-contents';
import { NavigationService } from '../../../shared/services/navigation/navigation.service';

@Component({
  selector: 'workshop-detail',
  templateUrl: './workshop-detail.component.html',
  styleUrls: ['./workshop-detail.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class WorkshopDetailComponent {

  constructor(
    private activatedRoute: ActivatedRoute,
    private navigationService: NavigationService,
    private router: Router) { }

  @ViewChild('paginator') paginator!: MatPaginator;

  docMetaObj = this.activatedRoute.params
  .pipe(
    tap(params => this.navigationService.categoryRouteSub.next(params['categoryId'])),
    switchMap(params => (
      combineLatest({
        params: of(params),
        docs: this.navigationService.workshopDocuments$
      })
    )),
    filter(({ docs }) => !!docs),
    map(({ params, docs }) => ({
        id: params['workshopId'] || docs[0]._id,
        docsIds: docs.map(doc => doc._id),
        currentIndex: docs.findIndex(doc => doc._id === params['workshopId']),
        docsLength: docs.length,
        docsHasMoreThenOne: docs.length > 1,
        hasWorkshopIdInURL: !!params['workshopId']
    }))
  );

  pageEventChange(docId: string, hasWorkshopIdInURL: boolean) {
    this.router.navigate([hasWorkshopIdInURL ? '../': './', docId!], { relativeTo: this.activatedRoute });
  }

  // updateTableOfContents(sectionName: string, docViewerContent: HTMLElement, sectionIndex = 0) {    
  //   if (this.tableOfContents) {
  //     setTimeout(() => {
  //       this.tableOfContents.addHeaders(sectionName, docViewerContent, sectionIndex);
  //       this.tableOfContents.updateScrollPosition();
  //     }, 500);
  //   }
  // }
}

