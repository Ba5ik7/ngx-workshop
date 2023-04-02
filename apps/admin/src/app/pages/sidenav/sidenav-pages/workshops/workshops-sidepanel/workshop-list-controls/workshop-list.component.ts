import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { MatLegacySnackBar as MatSnackBar, MatLegacySnackBarConfig as MatSnackBarConfig } from '@angular/material/legacy-snack-bar';
import { Subject } from 'rxjs';
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

  destory: Subject<boolean> = new Subject();

  cdkDragDisabled = false;

  snackBarOptiions: MatSnackBarConfig = {
    duration: 3000,
    horizontalPosition: 'right',
    verticalPosition: 'top'
  }

  @Input() categories!: any[] | null;

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

  createCategory(): void {
    this.matDialog.open(CreateWorkshopModalComponent, { width: '400px' });
  }
  
  deleteCategory(event: Event, workshop: Workshop): void {
    event.preventDefault();
    event.stopImmediatePropagation();
    this.matDialog.open(DeleteWorkshopModalComponent, { width: '400px', data: { workshop }});
  }

  editCategory(event: Event, workshop: any): void {
    event.preventDefault();
    event.stopImmediatePropagation();
    this.matDialog.open(EditWorkshopModalComponent, { width: '400px', data: { workshop }});
  }

  drop(event: CdkDragDrop<any[]>) {
    this.cdkDragDisabled = true;
    const categories = this.categories ?? []; 
    moveItemInArray(categories, event.previousIndex, event.currentIndex);
    this.categories?.map((category, index) => category.sortId = index);
    this.workshopEditorService.sortCategories(categories);
  }

  initSortCategories(): void {
    // this.workshopEditorService.sortCategoryFormError$
    // .pipe(takeUntil(this.destory))
    // .subscribe((error) => {
    //   this.snackBar.open('😿 Error updating the categories new order', undefined, this.snackBarOptiions);
    //   this.cdkDragDisabled = false;
    // });
    
    // this.workshopEditorService.sortCategoryFormSuccess$
    // .pipe(takeUntil(this.destory))
    // .subscribe((category) => {
    //   this.snackBar.open('😸 Categories new order updated', undefined, this.snackBarOptiions);
    //   this.cdkDragDisabled = false;
    // });
  }
}
