import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';
import { Subject, take, takeUntil } from 'rxjs';
import { Category } from '../../../../../../shared/interfaces/category.interface';
import { NavigationService } from '../../../../../../shared/services/navigation/navigation.service';
import { WorkshopEditorService } from '../../workshop-editor.service';

@Component({
  selector: 'app-create-category-modal',
  templateUrl: './create-category-modal.component.html',
  styleUrls: ['./create-category-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateCategoryModalComponent implements OnInit, OnDestroy {

  destory: Subject<boolean> = new Subject();

  formLoading: boolean = false;

  createCategoryFormLevelMessage!: string;

  errorMessages: { [key: string]: string } = {
    required: 'Required',
  };

  createCategoryFormErrorMessages: { [key: string]: string } = {
    name: '', summary: ''
  }

  createCategoryForm: FormGroup = this.formBuilder.group({
    sectionId:[this.navigationService.sectionRoute],
    sortId:[this.navigationService.categories.length],
    name: ['', [Validators.required]],
    summary: ['', [Validators.required]]
  });

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private workshopEditorService: WorkshopEditorService,
    private navigationService: NavigationService,
    private dialogRef: MatDialogRef<CreateCategoryModalComponent>,
    private formBuilder: FormBuilder
    ) { }

  ngOnInit(): void {
    this.initCreateCategory();
  }

  ngOnDestroy(): void {
    this.destory.next(true);
  }

  initCreateCategory(): void {
    this.createCategoryForm.statusChanges
    .pipe(takeUntil(this.destory))
    .subscribe(() => this.setErrorsMessages(this.createCategoryForm, this.createCategoryFormErrorMessages));
  
    this.workshopEditorService.createCategoryFormError$
    .pipe(takeUntil(this.destory))
    .subscribe((error) => {
      this.requestInProgress();
      this.createCategoryFormLevelMessage = this.errorMessages['httpFailure'];
      this.changeDetectorRef.markForCheck();
    });
    
    this.workshopEditorService.createCategoryFormSuccess$
    .pipe(takeUntil(this.destory))
    .subscribe((category) => this.createCategorySuccuessful(category));
  }

  createCategorySuccuessful(category: Category): void {
    this.requestInProgress();
    this.navigationService.categories$
    .pipe(take(1))
    .subscribe((categories: Category[]) => {
      const newCategories = categories.slice(0);
      newCategories.push(category);
      this.navigationService.setCategories(newCategories);
    });
    this.dialogRef.close();
  }

  createCategory() {
    this.requestInProgress(true);
    this.workshopEditorService.createCategory(this.createCategoryForm.value);
  }

  requestInProgress(predicate: boolean = false) {
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
