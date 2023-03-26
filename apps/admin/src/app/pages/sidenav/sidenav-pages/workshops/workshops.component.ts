import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { distinct, map, Observable, Subject, takeUntil } from 'rxjs';
import { Category, CategoryWorkshopDocument } from '../../../../shared/interfaces/category.interface';
import { NavigationService } from '../../../../shared/services/navigation/navigation.service';

@Component({
  selector: 'ngx-workshops',
  templateUrl: './workshops.component.html',
  styleUrls: ['./workshops.component.scss']
})
export class WorkshopsComponent implements OnDestroy {
  destory: Subject<boolean> = new Subject();

  categories!: Observable<Category[]>;
  currentCategory!: Observable<any>;
  
  workshopDocuments!: Observable<CategoryWorkshopDocument[]>;

  routerIsActivate = false;

  constructor(activatedRoute: ActivatedRoute, navigationService: NavigationService) {
    activatedRoute.params
    .pipe(takeUntil(this.destory), distinct())
    .subscribe(params => navigationService.sectionRouteSub.next(params['section']));

    this.categories = navigationService.categories$
    .pipe(
      map((categories: Category[]) => categories?.sort((a, b) => a.sortId - b.sortId))
    );
  
    this.currentCategory = navigationService.category$;
    this.workshopDocuments = navigationService.workshopDocuments$; 
  }

  ngOnDestroy(): void {
    this.destory.next(true);
  }
}
