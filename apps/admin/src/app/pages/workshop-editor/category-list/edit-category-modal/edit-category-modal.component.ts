import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import { Subject, take, takeUntil } from 'rxjs';
import { Category } from '../../../../shared/interfaces/category.interface';
import { NavigationService } from '../../../../shared/services/navigation/navigation.service';
import { WorkshopEditorService } from '../../workshop-editor.service';

@Component({
  selector: 'app-edit-category-modal',
  templateUrl: './edit-category-modal.component.html',
  styleUrls: ['./edit-category-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditCategoryModalComponent implements OnInit, OnDestroy {

  destory: Subject<boolean> = new Subject();

  formLoading: boolean = false;

  editCategoryFormLevelMessage!: string;

  errorMessages: { [key: string]: string } = {
    required: 'Required',
  };

  editCategoryFormErrorMessages: { [key: string]: string } = {
    name: '', summary: ''
  }

  editCategoryForm: FormGroup = this.formBuilder.group({
    _id: [this.data.category?._id, [Validators.required]],
    name: [this.data.category?.name, [Validators.required]],
    summary: [this.data.category?.summary, [Validators.required]]
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { category: any },
    private dialogRef: MatDialogRef<EditCategoryModalComponent>,
    private changeDetectorRef: ChangeDetectorRef,
    private workshopEditorService: WorkshopEditorService,
    private navigationService: NavigationService,
    private formBuilder: FormBuilder
    ) { }

  ngOnInit(): void {
    this.initEditCategoryForm();
  }

  ngOnDestroy(): void {
    this.destory.next(true);
  }

  initEditCategoryForm(): void {
    this.editCategoryForm.statusChanges
    .pipe(takeUntil(this.destory))
    .subscribe(() => this.setErrorsMessages(this.editCategoryForm, this.editCategoryFormErrorMessages));
  
    this.workshopEditorService.editCategoryFormError$
    .pipe(takeUntil(this.destory))
    .subscribe((error) => {
      this.requestInProgress();
      this.editCategoryFormLevelMessage = this.errorMessages['httpFailure'];
      this.changeDetectorRef.markForCheck();
    });
    
    this.workshopEditorService.editCategoryFormSuccess$
    .pipe(takeUntil(this.destory))
    .subscribe((category) => this.editCategorySuccuessful(category));
  }

  editCategorySuccuessful(category: Category): void {
    this.requestInProgress();
    this.navigationService.categories$
    .pipe(take(1))
    .subscribe((categories: Category[]) => {
      const newCategories = categories.filter((oldCategory) => oldCategory._id !== category._id);
      newCategories.push(category);
      this.navigationService.setCategories(newCategories);
    });
    this.dialogRef.close();
  }

  editCategoryNameAndSummary(): void {
    this.requestInProgress(true);
    this.workshopEditorService.editCategoryNameAndSummary(this.editCategoryForm.value);
  }

  requestInProgress(predicate: boolean = false): void {
    this.formLoading = predicate;
    this.dialogRef.disableClose = predicate;
  }

  setErrorsMessages(formGroup: FormGroup, formControlMessages: { [key: string]: string }): void {
    Object.keys(formGroup.controls).forEach(element => {
      const errors = formGroup.get(element)?.errors;
      if(errors) {         
        const error = Object.keys(errors)[0];
        formControlMessages[element] = this.errorMessages[error];
      }
    });
  }

}
