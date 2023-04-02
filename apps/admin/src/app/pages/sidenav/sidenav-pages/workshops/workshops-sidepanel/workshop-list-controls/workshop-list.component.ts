import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { MatLegacySnackBar as MatSnackBar, MatLegacySnackBarConfig as MatSnackBarConfig } from '@angular/material/legacy-snack-bar';
import { Subject, takeUntil } from 'rxjs';
import { WorkshopEditorService } from '../../../../../../shared/services/workshops/workshops.service';
import { CreateWorkshopModalComponent } from './modals/create-category-modal/create-workshop-modal.component';
import { DeleteWorkshopModalComponent } from './modals/delete-category-modal/delete-workshop-modal.component';
import { EditWorkshopModalComponent } from './modals/edit-category-modal/edit-workshop-modal.component';
import { MatLegacyListModule as MatListModule } from '@angular/material/legacy-list';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Workshop } from '../../../../../../shared/interfaces/category.interface';


@Component({
  standalone: true,
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
  // TODO: Reactive
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

  onDrop(event: CdkDragDrop<any[]>) {
    this.cdkDragDisabled = true;
    const workshops = this.workshops ?? []; 
    moveItemInArray(workshops, event.previousIndex, event.currentIndex);
    this.workshops?.map((workshop, index) => workshop.sortId = index);
    this.workshopEditorService.sortWorkshop(workshops).subscribe({
      error: () => this.sortWorkshopFormError$.next(true),
      complete: () => this.sortWorkshopFormSuccess$.next(true)
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
