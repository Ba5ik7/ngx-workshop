import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { distinct, map, Observable, Subject, takeUntil } from 'rxjs';
import { Category, CategoryWorkshopDocument } from '../../../../shared/interfaces/category.interface';
import { NavigationService } from '../../../../shared/services/navigation/navigation.service';

import { CommonModule } from '@angular/common';


import { MatLegacyListModule as MatListModule } from '@angular/material/legacy-list';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatLegacySnackBarModule as MatSnackBarModule } from '@angular/material/legacy-snack-bar';
import { PageListComponent } from './workshops-sidepanel/page-list/page-list.component';
import { CategoryListComponent } from './workshops-sidepanel/category-list/category-list.component';

@Component({
  standalone: true,
  selector: 'ngx-workshops',
  template: `
    <router-outlet (activate)="routerIsActivate = true" (deactivate)="routerIsActivate = false"></router-outlet>
    <h1 *ngIf="!routerIsActivate" class="select-a-category-placeholder">Select a Category</h1>
    <div class="workshop-controls-panel">
      <div class="controls">
        <ngx-category-list [categories]="categories | async"></ngx-category-list>
        <ngx-page-list [pages]="workshopDocuments | async" [currentCategory]="currentCategory | async"></ngx-page-list>
      </div>
    </div>
  `,
  styles: [`
    :host {
      grid-template-columns: 0 calc(100vw - 558px) auto;
      display: grid;
      .select-a-category-placeholder{
        padding: 50px;
      }
    }
    .workshop-controls-panel {
      position: sticky;
      top: 0;
      height: calc(100vh - 56px);
      width: 315px;
    }
  `],
  imports: [
    CommonModule,
    RouterModule,
    PageListComponent,
    CategoryListComponent,
    MatSnackBarModule
  ]
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
