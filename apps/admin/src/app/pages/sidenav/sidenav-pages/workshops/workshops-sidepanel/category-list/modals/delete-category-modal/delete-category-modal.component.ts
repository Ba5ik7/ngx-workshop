import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import { Subject, take, takeUntil } from 'rxjs';
import { Category } from '../../../../../../../../shared/interfaces/category.interface';
import { NavigationService } from '../../../../../../../../shared/services/navigation/navigation.service';
import { MatchStringValidator } from '../../../../../../../../shared/validators/match-string.validator';
import { WorkshopEditorService } from '../../../../../../../../shared/services/workshops/workshops.service';

@Component({
  selector: 'ngx-delete-category-modal',
  templateUrl: './delete-category-modal.component.html',
  styleUrls: ['./delete-category-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeleteCategoryModalComponent implements OnInit {

  destory: Subject<boolean> = new Subject();

  formLoading = false;

  deleteCategoryFormLevelMessage!: string;

  errorMessages: { [key: string]: string } = {
    required: 'Required',
    matchString: 'Name does NOT match.',
  };

  deleteCategoryFormErrorMessages: { [key: string]: string } = {
    name: ''
  }

  deleteCategoryForm: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required]]
  }, { validators: MatchStringValidator('name', this.data.category.name) });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { category: any },
    private dialogRef: MatDialogRef<DeleteCategoryModalComponent>,
    private changeDetectorRef: ChangeDetectorRef,
    private workshopEditorService: WorkshopEditorService,
    private navigationService: NavigationService,
    private formBuilder: FormBuilder
    ) { }

  ngOnInit(): void {
    this.initDeleteCategoryForm();
  }
  
  initDeleteCategoryForm(): void {
    this.deleteCategoryForm.statusChanges
    .pipe(takeUntil(this.destory))
    .subscribe(() => this.setErrorsMessages(this.deleteCategoryForm, this.deleteCategoryFormErrorMessages));
  
    this.workshopEditorService.deleteCategoryFormError$
    .pipe(takeUntil(this.destory))
    .subscribe((error) => {
      this.requestInProgress();
      this.deleteCategoryFormLevelMessage = this.errorMessages['httpFailure'];
      this.changeDetectorRef.markForCheck();
    });
    
    this.workshopEditorService.deleteCategoryFormSuccess$
    .pipe(takeUntil(this.destory))
    .subscribe((_id) => this.deleteCategorySuccuessful(_id));
  }

  deleteCategorySuccuessful(_id: string): void {
    this.requestInProgress();
    this.navigationService.categories$
    .pipe(take(1))
    .subscribe((categories: Category[]) => {
      const newCategories = categories.filter((oldCategory) => oldCategory._id !== _id);
      this.navigationService.setCategories(newCategories);
    });
    this.dialogRef.close();
  }

  deleteCategory() {
    this.requestInProgress(true);
    this.workshopEditorService.deleteCategory(this.data.category._id);
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
