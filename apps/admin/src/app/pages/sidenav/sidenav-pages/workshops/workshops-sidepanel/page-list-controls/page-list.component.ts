import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { MatLegacySnackBar as MatSnackBar, MatLegacySnackBarConfig as MatSnackBarConfig } from '@angular/material/legacy-snack-bar';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { Subject, takeUntil } from 'rxjs';
import { WorkshopEditorService } from '../../../../../../shared/services/workshops/workshops.service';
import { CreatePageModalComponent } from './modals/create-page-modal/create-page-modal.component';
// import { DeletePageModalComponent } from './modals/delete-page-modal/delete-page-modal.component';
// import { EditPageModalComponent } from './modals/edit-page-modal/edit-page-modal.component';
import { MatLegacyListModule as MatListModule } from '@angular/material/legacy-list';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { WorkshopDocument, WorkshopDocumentIdentifier } from '../../../../../../shared/interfaces/category.interface';

@Component({
  standalone: true,
  selector: 'ngx-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.scss'],
  imports: [
    CommonModule,
    RouterModule,
    MatListModule,
    MatIconModule,
    DragDropModule,
    MatButtonModule
  ]
})
export class PageListComponent implements OnInit, OnDestroy {

  destory: Subject<boolean> = new Subject();

  cdkDragDisabled = false;

  snackBarOptiions: MatSnackBarConfig = {
    duration: 3000,
    horizontalPosition: 'right',
    verticalPosition: 'top'
  }

  @Input() documents: WorkshopDocumentIdentifier[] = [];

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
    // event.preventDefault();
    // event.stopImmediatePropagation();
    // this.matDialog.open(EditPageModalComponent, { width: '400px', data: { page }});
  }

  deletePage(event: Event, page: any): void {
    // event.preventDefault();
    // event.stopImmediatePropagation();
    // this.matDialog.open(DeletePageModalComponent, { width: '400px', data: { page }});
  }


  drop(event: CdkDragDrop<any[]>) {
    // this.cdkDragDisabled = true;
    // const pages = this.pages ?? []; 
    // moveItemInArray(pages, event.previousIndex, event.currentIndex);
    // this.pages?.map((page, index) => page.sortId = index);
    // this.workshopEditorService.sortPages(pages, this.currentCategory._id);
  }

  initSortPages(): void {
    // this.workshopEditorService.sortPagesFormError$
    // .pipe(takeUntil(this.destory))
    // .subscribe((error) => {
    //   this.snackBar.open('😿 Error updating the categories new order', undefined, this.snackBarOptiions);
    //   this.cdkDragDisabled = false;
    // });
    
    // this.workshopEditorService.sortPagesFormSuccess$
    // .pipe(takeUntil(this.destory))
    // .subscribe((category) => {
    //   this.snackBar.open('😸 Categories new order updated', undefined, this.snackBarOptiions);
    //   this.cdkDragDisabled = false;      
    // });

    // this.workshopEditorService.savePageHTMLError$
    // .pipe(takeUntil(this.destory))
    // .subscribe((error) => {
    //   this.snackBar.open('😿 Error saving workshop', undefined, this.snackBarOptiions);
    // });

    // this.workshopEditorService.savePageHTMLSuccess$
    // .pipe(takeUntil(this.destory))
    // .subscribe((page) => {
    //   this.snackBar.open('😸 Workshop was saved', undefined, this.snackBarOptiions);
    // });
  }
}
