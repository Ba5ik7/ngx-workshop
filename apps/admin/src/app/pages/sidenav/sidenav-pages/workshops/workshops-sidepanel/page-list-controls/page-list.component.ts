import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { MatLegacySnackBar as MatSnackBar, MatLegacySnackBarConfig as MatSnackBarConfig } from '@angular/material/legacy-snack-bar';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { from, of, Subject, switchMap, take, takeUntil } from 'rxjs';
import { WorkshopEditorService } from '../../../../../../shared/services/workshops/workshops.service';
import { CreatePageModalComponent } from './modals/create-page-modal/create-page-modal.component';
import { DeletePageModalComponent } from './modals/delete-page-modal/delete-page-modal.component';
import { EditPageModalComponent } from './modals/edit-page-modal/edit-page-modal.component';
import { MatLegacyListModule as MatListModule } from '@angular/material/legacy-list';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { WorkshopDocumentIdentifier } from '../../../../../../shared/interfaces/category.interface';
import { NavigationService } from '../../../../../../shared/services/navigation/navigation.service';

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
  // TODO: Make it Reactive
  // ! Make this more generic so that it can be used for other components
  destory: Subject<boolean> = new Subject();

  cdkDragDisabled = false;

  snackBarOptiions: MatSnackBarConfig = {
    duration: 3000,
    horizontalPosition: 'right',
    verticalPosition: 'top'
  }

  sortDocumentFormError$ = new Subject<boolean>();
  sortDocumentFormSuccess$ = new Subject<boolean>();

  @Input() documents: WorkshopDocumentIdentifier[] = [];
  @Input() workshopDocumentGroupId = '';

  navigationService = inject(NavigationService);
  constructor(
    public matDialog: MatDialog,
    private snackBar: MatSnackBar,
    public workshopEditorService: WorkshopEditorService
  ) { }

  // ! Worst place to this, it saves the HTML of the editor
  saveEditorData(): void {
    this.workshopEditorService.saveEditorDataSubject.next(true);
  }

  ngOnInit(): void {
    this.initSortPages(); 
   }

  ngOnDestroy(): void {
    this.destory.next(true);
  }

  createPage(): void {
    this.matDialog.open(CreatePageModalComponent, { width: '400px' });
  }

  editPage(event: Event, workshopDocument: unknown): void {
    event.preventDefault();
    event.stopImmediatePropagation();
    this.matDialog.open(EditPageModalComponent, { width: '400px', data: { workshopDocument }});
  }

  deletePage(event: Event, workshopDocument: unknown): void {
    event.preventDefault();
    event.stopImmediatePropagation();
    this.matDialog.open(DeletePageModalComponent, { width: '400px', data: { workshopDocument }});
  }


  onDrop(event: CdkDragDrop<{ previousIndex: number, currentIndex: number }[]>) {
    this.cdkDragDisabled = true;
    const documents = this.documents ?? []; 
    moveItemInArray(documents, event.previousIndex, event.currentIndex);
    this.documents?.map((document, index) => document.sortId = index);
    this.workshopEditorService.sortDocuments(documents).subscribe({
      error: () => {
        this.sortDocumentFormError$.next(true)
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
        this.sortDocumentFormSuccess$.next(true)
      }
    });
  }

  initSortPages(): void {
    this.sortDocumentFormError$
    .pipe(takeUntil(this.destory))
    .subscribe(() => {
      this.snackBar.open('😿 Error updating the categories new order', undefined, this.snackBarOptiions);
      this.cdkDragDisabled = false;
    });
    
    this.sortDocumentFormSuccess$
    .pipe(takeUntil(this.destory))
    .subscribe(() => {
      this.snackBar.open('😸 Categories new order updated', undefined, this.snackBarOptiions);
      this.cdkDragDisabled = false;      
    });

    // this.savePageHTMLError$
    // .pipe(takeUntil(this.destory))
    // .subscribe(() => {
    //   this.snackBar.open('😿 Error saving workshop', undefined, this.snackBarOptiions);
    // });

    // this.savePageHTMLSuccess$
    // .pipe(takeUntil(this.destory))
    // .subscribe(() => {
    //   this.snackBar.open('😸 Workshop was saved', undefined, this.snackBarOptiions);
    // });
  }
}
