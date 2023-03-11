import { Component, OnDestroy, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatLegacyPaginator as MatPaginator, LegacyPageEvent as PageEvent } from '@angular/material/legacy-paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, of, Subject, switchMap, takeUntil, tap } from 'rxjs';
import { Category } from '../../../../app/shared/interfaces/category.interface';
import { NavigationService, filterNullish } from '../../../shared/services/navigation/navigation.service';

@Component({
  selector: 'workshop-detail',
  templateUrl: './workshop-detail.component.html',
  styleUrls: ['./workshop-detail.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class WorkshopDetailComponent implements OnDestroy {

  destory: Subject<boolean> = new Subject();
  workshopDocument!: string;
  workshopDocumentsLength: number = 0;
  hasMoreThanOneDocument: boolean = false;
  workshopDocuments!: Category[];
  hasWorkshopId: boolean = false;

  @ViewChild('paginator') paginator!: MatPaginator;

  constructor(
    private activatedRoute: ActivatedRoute,
    private navigationService: NavigationService,
    private router: Router) {
      this.activatedRoute.params
      .pipe(
        filterNullish(),
        tap((params) => this.navigationService.categoryRouteSub.next(params['categoryId'])),
        switchMap((params) => (
          combineLatest({
            params: of(params),
            workshopDocuments: this.navigationService.workshopDocuments$
          })
        )),
        takeUntil(this.destory),
      )
      .subscribe(({ params, workshopDocuments }) => {
        if(!workshopDocuments) return;
  
        this.workshopDocuments = workshopDocuments;
        if(params['workshopId']) {
          this.workshopDocument = params['workshopId'];
          this.setPaginatorIndex();
        } else { 
          this.workshopDocument = workshopDocuments[0]._id!;
        }
  
        this.hasMoreThanOneDocument = workshopDocuments.length > 1;
        this.workshopDocumentsLength = workshopDocuments.length;
      });
  }

  ngOnDestroy(): void {
    this.destory.next(true);
  }

  pageEventChange({ pageIndex }: PageEvent) {
    this.router.navigate([this.hasWorkshopId ? '../': './', this.workshopDocuments[pageIndex]._id], { relativeTo: this.activatedRoute });
  }

  setPaginatorIndex() {
    requestAnimationFrame(() => {
      this.hasWorkshopId = true;
      this.paginator.pageIndex = this.workshopDocuments.findIndex((workshopDocument) => workshopDocument._id === this.workshopDocument);
    });
  }
}
