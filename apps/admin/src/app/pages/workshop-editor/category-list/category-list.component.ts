import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { MatLegacySnackBar as MatSnackBar, MatLegacySnackBarConfig as MatSnackBarConfig } from '@angular/material/legacy-snack-bar';
import { Subject, takeUntil } from 'rxjs';
import { WorkshopEditorService } from '../workshop-editor.service';
import { CreateCategoryModalComponent } from './create-category-modal/create-category-modal.component';
import { DeleteCategoryModalComponent } from './delete-category-modal/delete-category-modal.component';
import { EditCategoryModalComponent } from './edit-category-modal/edit-category-modal.component';

@Component({
  selector: 'category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit, OnDestroy {

  destory: Subject<boolean> = new Subject();

  cdkDragDisabled: boolean = false;

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
    this.matDialog.open(CreateCategoryModalComponent, { width: '400px' });
  }
  
  deleteCategory(event: Event, category: any): void {
    event.preventDefault();
    event.stopImmediatePropagation();
    this.matDialog.open(DeleteCategoryModalComponent, { width: '400px', data: { category }});
  }

  editCategory(event: Event, category: any): void {
    event.preventDefault();
    event.stopImmediatePropagation();
    this.matDialog.open(EditCategoryModalComponent, { width: '400px', data: { category }});
  }

  drop(event: CdkDragDrop<any[]>) {
    this.cdkDragDisabled = true;
    const categories = this.categories ?? []; 
    moveItemInArray(categories, event.previousIndex, event.currentIndex);
    this.categories?.map((category, index) => category.sortId = index);
    this.workshopEditorService.sortCategories(categories);
  }

  initSortCategories(): void {
    this.workshopEditorService.sortCategoryFormError$
    .pipe(takeUntil(this.destory))
    .subscribe((error) => {
      this.snackBar.open('😿 Error updating the categories new order', undefined, this.snackBarOptiions);
      this.cdkDragDisabled = false;
    });
    
    this.workshopEditorService.sortCategoryFormSuccess$
    .pipe(takeUntil(this.destory))
    .subscribe((category) => {
      this.snackBar.open('😸 Categories new order updated', undefined, this.snackBarOptiions);
      this.cdkDragDisabled = false;
    });
  }
}
