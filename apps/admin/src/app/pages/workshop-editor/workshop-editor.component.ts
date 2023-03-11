import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { distinct, map, mergeMap, Observable, Subject, takeUntil, toArray } from 'rxjs';
import { Category, CategoryWorkshopDocument } from '../../shared/interfaces/category.interface';
import { NavigationService } from '../../shared/services/navigation/navigation.service';

@Component({
  selector: 'app-workshop-editor',
  templateUrl: './workshop-editor.component.html',
  styleUrls: ['./workshop-editor.component.scss']
})
export class WorkshopEditorComponent implements OnInit, OnDestroy {
  destory: Subject<boolean> = new Subject();

  categories!: Observable<Category[]>;
  currentCategory!: Observable<any>;
  
  workshopDocuments!: Observable<CategoryWorkshopDocument[]>;

  routerIsActivate: boolean = false;

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

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.destory.next(true);
  }
}
