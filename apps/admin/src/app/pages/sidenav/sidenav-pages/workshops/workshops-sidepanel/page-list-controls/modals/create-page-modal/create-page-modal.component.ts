import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';
import { Subject, takeUntil } from 'rxjs';
import { Category } from '../../../../../../../../shared/interfaces/category.interface';
import { NavigationService } from '../../../../../../../../shared/services/navigation/navigation.service';
import { WorkshopEditorService } from '../../../../../../../../shared/services/workshops/workshops.service';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'ngx-create-page-modal',
  templateUrl: './create-page-modal.component.html',
  styleUrls: ['./create-page-modal.component.scss'],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreatePageModalComponent implements OnInit, OnDestroy {

  destory: Subject<boolean> = new Subject();

  formLoading = false;

  createPageFormLevelMessage!: string;

  errorMessages: { [key: string]: string } = {
    required: 'Required',
  };

  createPageFormErrorMessages: { [key: string]: string } = {
    name: ''
  }

  createPageForm: FormGroup = this.formBuilder.group({
    id: [this.navigationService.category.id],
    category:[this.navigationService.category],
    sortId:[this.navigationService.workshopDocuments.length],
    name: ['', [Validators.required]],
  });

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private workshopEditorService: WorkshopEditorService,
    private navigationService: NavigationService,
    private dialogRef: MatDialogRef<CreatePageModalComponent>,
    private formBuilder: FormBuilder
    ) { }

  ngOnInit(): void {
    this.initCreatePage();
  }

  ngOnDestroy(): void {
    this.destory.next(true);
  }

  initCreatePage(): void {
    this.createPageForm.statusChanges
    .pipe(takeUntil(this.destory))
    .subscribe(() => this.setErrorsMessages(this.createPageForm, this.createPageFormErrorMessages));
  
    this.workshopEditorService.createPageFormError$
    .pipe(takeUntil(this.destory))
    .subscribe((error) => {
      this.requestInProgress();
      this.createPageFormLevelMessage = this.errorMessages['httpFailure'];
      this.changeDetectorRef.markForCheck();
    });
    
    this.workshopEditorService.createPageFormSuccess$
    .pipe(takeUntil(this.destory))
    .subscribe((category) => this.createPageSuccuessful(category));
  }

  createPageSuccuessful(category: Category): void {
    const newCategories = this.navigationService.categories.filter(({ id }) => id !== category.id);
    newCategories.push(category);
    this.navigationService.setCategories(newCategories);
    this.requestInProgress();
    this.dialogRef.close();
  }

  createPage() {
    this.requestInProgress(true);
    this.workshopEditorService.createPage(this.createPageForm.value);
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