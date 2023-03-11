import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import { Subject, takeUntil } from 'rxjs';
// import { Category } from '../../../../shared/interfaces/category.interface';
import { WorkshopDocument } from '../../../../shared/interfaces/workshop-document.interface';
import { NavigationService } from '../../../../shared/services/navigation/navigation.service';
import { MatchStringValidator } from '../../../../shared/validators/match-string.validator';
import { WorkshopEditorService } from '../../workshop-editor.service';

@Component({
  selector: 'app-delete-page-modal',
  templateUrl: './delete-page-modal.component.html',
  styleUrls: ['./delete-page-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeletePageModalComponent implements OnInit {

  destory: Subject<boolean> = new Subject();

  formLoading: boolean = false;

  deletePageFormLevelMessage!: string;

  errorMessages: { [key: string]: string } = {
    required: 'Required',
    matchString: 'Name does NOT match.',
  };

  deletePageFormErrorMessages: { [key: string]: string } = {
    name: ''
  }

  deletePageForm: FormGroup = this.formBuilder.group({
    _id: [this.data.page._id],
    category:[this.navigationService.category],
    name: ['', [Validators.required]]
  }, { validators: MatchStringValidator('name', this.data.page.name) });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { page: any },
    private dialogRef: MatDialogRef<DeletePageModalComponent>,
    private changeDetectorRef: ChangeDetectorRef,
    private workshopEditorService: WorkshopEditorService,
    private navigationService: NavigationService,
    private formBuilder: FormBuilder
    ) { }

  ngOnInit(): void {
    this.initDeletePageForm();
  }
  
  initDeletePageForm(): void {
    this.deletePageForm.statusChanges
    .pipe(takeUntil(this.destory))
    .subscribe(() => this.setErrorsMessages(this.deletePageForm, this.deletePageFormErrorMessages));
  
    this.workshopEditorService.deletePageFormError$
    .pipe(takeUntil(this.destory))
    .subscribe((error) => {
      this.requestInProgress();
      this.deletePageFormLevelMessage = this.errorMessages['httpFailure'];
      this.changeDetectorRef.markForCheck();
    });
    
    this.workshopEditorService.deletePageFormSuccess$
    .pipe(takeUntil(this.destory))
    .subscribe((page) => this.deletePageSuccuessful(page));
  }

  deletePageSuccuessful(page: WorkshopDocument): void {
    const newCategory = page.category;
    const newCategories = this.navigationService.categories.filter(({ id }) => id !== page.category?.id);
    const newWorkshopDocuments = page.category?.workshopDocuments?.filter(({ _id }) => _id !== page._id);
    if(newCategory?.workshopDocuments) newCategory.workshopDocuments = newWorkshopDocuments;
    if(newCategory) newCategories.push(newCategory);
    this.navigationService.setCategories(newCategories);
    this.requestInProgress();
    this.dialogRef.close();
  }

  deletePage() {
    this.requestInProgress(true);
    this.workshopEditorService.deletePage(this.deletePageForm.value);
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
