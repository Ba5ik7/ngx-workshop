import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import { Subject, takeUntil } from 'rxjs';
import { Category } from '../../../../../../../../shared/interfaces/category.interface';
// import { WorkshopDocument } from '../../../../shared/interfaces/workshop-document.interface';
import { NavigationService } from '../../../../../../../../shared/services/navigation/navigation.service';
import { WorkshopEditorService } from '../../../../../../../../shared/services/workshops/workshops.service';

@Component({
  selector: 'ngx-edit-page-modal',
  templateUrl: './edit-page-modal.component.html',
  styleUrls: ['./edit-page-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditPageModalComponent implements OnInit, OnDestroy {

  destory: Subject<boolean> = new Subject();

  formLoading = false;

  editPageFormLevelMessage!: string;

  errorMessages: { [key: string]: string } = {
    required: 'Required',
  };

  editPageFormErrorMessages: { [key: string]: string } = {
    name: '', summary: ''
  }

  editPageForm: FormGroup = this.formBuilder.group({
    _id: [this.data.page._id],
    category:[this.navigationService.category],
    name: [this.data.page?.name, [Validators.required]]
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { page: any },
    private dialogRef: MatDialogRef<EditPageModalComponent>,
    private changeDetectorRef: ChangeDetectorRef,
    private workshopEditorService: WorkshopEditorService,
    private navigationService: NavigationService,
    private formBuilder: FormBuilder
    ) { }

  ngOnInit(): void {
    this.initEditPageForm();
  }

  ngOnDestroy(): void {
    this.destory.next(true);
  }

  initEditPageForm(): void {
    this.editPageForm.statusChanges
    .pipe(takeUntil(this.destory))
    .subscribe(() => this.setErrorsMessages(this.editPageForm, this.editPageFormErrorMessages));
  
    this.workshopEditorService.editPageFormError$
    .pipe(takeUntil(this.destory))
    .subscribe((error) => {
      this.requestInProgress();
      this.editPageFormLevelMessage = this.errorMessages['httpFailure'];
      this.changeDetectorRef.markForCheck();
    });
    
    this.workshopEditorService.editPageFormSuccess$
    .pipe(takeUntil(this.destory))
    .subscribe((category) => this.editPageSuccuessful(category));
  }

  editPageSuccuessful(category: Category): void {
    const newCategories = this.navigationService.categories.filter(({ id }) => id !== category?.id);
    newCategories.push(category);
    this.navigationService.setCategories(newCategories);
    this.requestInProgress();
    this.dialogRef.close();
  }

  editPageNameAndSummary(): void {
    this.requestInProgress(true);
    this.workshopEditorService.editPageNameAndSummary(this.editPageForm.value);
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
