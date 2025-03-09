import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit, Input, OnDestroy, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { from, of, Subject, switchMap, take, takeUntil } from 'rxjs';
import { WorkshopEditorService } from '../../../../../../shared/services/workshops/workshops.service';
import { CreateWorkshopModalComponent } from './modals/create-category-modal/create-workshop-modal.component';
import { DeleteWorkshopModalComponent } from './modals/delete-category-modal/delete-workshop-modal.component';
import { EditWorkshopModalComponent } from './modals/edit-category-modal/edit-workshop-modal.component';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Workshop } from '../../../../../../shared/interfaces/navigation.interface';
import { NavigationService } from '../../../../../../shared/services/navigation/navigation.service';


@Component({
    selector: 'ngx-workshop-list',
    templateUrl: './workshop-list.component.html',
    styleUrls: ['./workshop-list.component.scss'],
    imports: [
        CommonModule,
        RouterModule,
        MatListModule,
        MatIconModule,
        DragDropModule
    ]
})
export class WorkshopListComponent implements OnInit, OnDestroy {
  // TODO: Make it Reactive
  // ! Make this more generic so that it can be used for other components
  destory: Subject<boolean> = new Subject();

  cdkDragDisabled = false;

  snackBarOptiions: MatSnackBarConfig = {
    duration: 3000,
    horizontalPosition: 'right',
    verticalPosition: 'top'
  }

  sortWorkshopFormError$ = new Subject<boolean>();
  sortWorkshopFormSuccess$ = new Subject<boolean>();

  @Input() workshops: Workshop[] = [];

  navigationService = inject(NavigationService);
  constructor(
    public matDialog: MatDialog,
    private snackBar: MatSnackBar,
    public workshopEditorService: WorkshopEditorService
    ) {
  }

  ngOnInit(): void {
    this.initSortCategories();
  }

  ngOnDestroy(): void {
    this.destory.next(true);
  }

  createWorkshop(): void {
    this.matDialog.open(CreateWorkshopModalComponent, { width: '400px' });
  }
  
  deleteWorkshop(event: Event, workshop: Workshop): void {
    event.preventDefault();
    event.stopImmediatePropagation();
    this.matDialog.open(DeleteWorkshopModalComponent, { width: '400px', data: { workshop }});
  }

  editWorkshop(event: Event, workshop: Workshop): void {
    event.preventDefault();
    event.stopImmediatePropagation();
    this.matDialog.open(EditWorkshopModalComponent, { width: '400px', data: { workshop }});
  }

  onDrop(event: CdkDragDrop<{ previousIndex: number, currentIndex: number }[]>) {
    this.cdkDragDisabled = true;
    const workshops = this.workshops ?? []; 
    moveItemInArray(workshops, event.previousIndex, event.currentIndex);
    this.workshops?.map((workshop, index) => workshop.sortId = index);
    this.workshopEditorService.sortWorkshops(workshops).subscribe({
      error: () => {
        this.sortWorkshopFormError$.next(true)
      },
      complete: () => {
        from(this.navigationService.getCurrentSection().pipe(take(1)))
        .pipe(
          switchMap((section) => {
            if (section && section._id) {
              return this.navigationService.navigateToSection(section._id, true);
            }
            return of(null);
          }),
          take(1)
        ).subscribe();
        this.sortWorkshopFormSuccess$.next(true)
      }
    });
  }

  initSortCategories(): void {
    this.sortWorkshopFormError$
    .pipe(takeUntil(this.destory))
    .subscribe(() => {
      this.snackBar.open('😿 Error updating the workshops new order', undefined, this.snackBarOptiions);
      this.cdkDragDisabled = false;
    });
    
    this.sortWorkshopFormSuccess$
    .pipe(takeUntil(this.destory))
    .subscribe(() => {
      this.snackBar.open('😸 Categories new order updated', undefined, this.snackBarOptiions);
      this.cdkDragDisabled = false;
    });
  }
}
