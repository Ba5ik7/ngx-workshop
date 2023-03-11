import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { MatLegacySnackBar as MatSnackBar, MatLegacySnackBarConfig as MatSnackBarConfig } from '@angular/material/legacy-snack-bar';
import { Subject, takeUntil } from 'rxjs';
import { WorkshopEditorService } from '../workshop-editor.service';
import { CreatePageModalComponent } from './create-page-modal/create-page-modal.component';
import { DeletePageModalComponent } from './delete-page-modal/delete-page-modal.component';
import { EditPageModalComponent } from './edit-page-modal/edit-page-modal.component';

@Component({
  selector: 'page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.scss'],
})
export class PageListComponent implements OnInit, OnDestroy {

  destory: Subject<boolean> = new Subject();

  cdkDragDisabled: boolean = false;

  snackBarOptiions: MatSnackBarConfig = {
    duration: 3000,
    horizontalPosition: 'right',
    verticalPosition: 'top'
  }

  @Input() pages!: any[] | null;
  @Input() currentCategory!: any | null;

  constructor(
    public matDialog: MatDialog,
    private snackBar: MatSnackBar,
    public workshopEditorService: WorkshopEditorService
  ) { }

  ngOnInit(): void {
    this.initSortPages(); 
   }

  ngOnDestroy(): void {
    this.destory.next(true);
  }

  saveEditorData(): void {
    this.workshopEditorService.saveEditorDataSubject.next(true);
  }

  createPage(): void {
    this.matDialog.open(CreatePageModalComponent, { width: '400px' });
  }

  editPage(event: Event, page: any): void {
    event.preventDefault();
    event.stopImmediatePropagation();
    this.matDialog.open(EditPageModalComponent, { width: '400px', data: { page }});
  }

  deletePage(event: Event, page: any): void {
    event.preventDefault();
    event.stopImmediatePropagation();
    this.matDialog.open(DeletePageModalComponent, { width: '400px', data: { page }});
  }


  drop(event: CdkDragDrop<any[]>) {
    this.cdkDragDisabled = true;
    const pages = this.pages ?? []; 
    moveItemInArray(pages, event.previousIndex, event.currentIndex);
    this.pages?.map((page, index) => page.sortId = index);
    this.workshopEditorService.sortPages(pages, this.currentCategory._id);
  }

  initSortPages(): void {
    this.workshopEditorService.sortPagesFormError$
    .pipe(takeUntil(this.destory))
    .subscribe((error) => {
      this.snackBar.open('😿 Error updating the categories new order', undefined, this.snackBarOptiions);
      this.cdkDragDisabled = false;
    });
    
    this.workshopEditorService.sortPagesFormSuccess$
    .pipe(takeUntil(this.destory))
    .subscribe((category) => {
      this.snackBar.open('😸 Categories new order updated', undefined, this.snackBarOptiions);
      this.cdkDragDisabled = false;      
    });

    this.workshopEditorService.savePageHTMLError$
    .pipe(takeUntil(this.destory))
    .subscribe((error) => {
      this.snackBar.open('😿 Error saving workshop', undefined, this.snackBarOptiions);
    });

    this.workshopEditorService.savePageHTMLSuccess$
    .pipe(takeUntil(this.destory))
    .subscribe((page) => {
      this.snackBar.open('😸 Workshop was saved', undefined, this.snackBarOptiions);
    });
  }
}
