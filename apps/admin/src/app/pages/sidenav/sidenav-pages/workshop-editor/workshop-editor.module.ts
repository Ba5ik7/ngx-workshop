import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkshopEditorRoutingModule } from './workshop-editor-routing.module';
import { WorkshopEditorComponent } from './workshop-editor.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { MatLegacyListModule as MatListModule } from '@angular/material/legacy-list';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { DeleteCategoryModalComponent } from './category-list/delete-category-modal/delete-category-modal.component';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { EditCategoryModalComponent } from './category-list/edit-category-modal/edit-category-modal.component';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateCategoryModalComponent } from './category-list/create-category-modal/create-category-modal.component';
import { PageListComponent } from './page-list/page-list.component';
import { MatLegacySnackBarModule as MatSnackBarModule } from '@angular/material/legacy-snack-bar';
import { CreatePageModalComponent } from './page-list/create-page-modal/create-page-modal.component';
import { DeletePageModalComponent } from './page-list/delete-page-modal/delete-page-modal.component';
import { EditPageModalComponent } from './page-list/edit-page-modal/edit-page-modal.component';

@NgModule({
  declarations: [
    WorkshopEditorComponent,
    CategoryListComponent,
    DeleteCategoryModalComponent,
    EditCategoryModalComponent,
    CreateCategoryModalComponent,
    PageListComponent,
    CreatePageModalComponent,
    DeletePageModalComponent,
    EditPageModalComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DragDropModule,
    MatListModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSnackBarModule,
    WorkshopEditorRoutingModule
  ]
})
export class WorkshopEditorModule { }
