import { Component, inject, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BehaviorSubject, combineLatest, mergeMap, of, take, takeUntil, tap } from 'rxjs';
import { NavigationService } from '../../../../../../../../shared/services/navigation/navigation.service';
import { KeyValue, WorkshopEditorService } from '../../../../../../../../shared/services/workshops/workshops.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { Workshop } from '../../../../../../../../shared/interfaces/navigation.interface';
import { MatRadioModule } from '@angular/material/radio';

@Component({
    selector: 'ngx-edit-workshop-modal',
    templateUrl: './edit-workshop-modal.component.html',
    styleUrls: ['./edit-workshop-modal.component.scss'],
    imports: [
        CommonModule,
        MatFormFieldModule,
        MatDialogModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatInputModule,
        MatRadioModule
    ]
})
export class EditWorkshopModalComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { workshop: Workshop }) { }
  private workshopEditorService = inject(WorkshopEditorService);
  private navigationService = inject(NavigationService);
  private dialogRef = inject(MatDialogRef<EditWorkshopModalComponent>);
  private formBuilder = inject(FormBuilder);
  private selectedImage: File | null = null;

  editWorkshopFormLevelMessage$ = new BehaviorSubject<string | undefined>(undefined);
  errorMessages: KeyValue = {
    required: 'Required',
  };
  editWorkshopControlsErrorMessages: KeyValue = {
    name: '', summary: ''
  }

  loading$ = new BehaviorSubject<boolean>(false)
  formGroup$ = of(
    this.formBuilder.group({
      _id: [this.data.workshop?._id],
      name: [this.data.workshop?.name, [Validators.required]],
      summary: [this.data.workshop?.summary, [Validators.required]],
      imageURLOrUpload: ['url'],
      thumbnail: [this.data.workshop?.thumbnail, [Validators.required]],
      image: new FormControl<File | null>(null)
    })
  );

  viewModel$ = combineLatest({
    formGroup: this.formGroup$.pipe(
      tap((formGroup) => {
        formGroup.statusChanges
        .pipe(takeUntil(this.dialogRef.afterClosed()))
        .subscribe(() => {
          this.workshopEditorService.ifErrorsSetMessages(
            formGroup,
            this.editWorkshopControlsErrorMessages,
            this.errorMessages
          );
        });
      }),
    ),
    loading: this.loading$.pipe(tap((loading) => this.dialogRef.disableClose = loading)),
    editWorkshopFormLevelMessage: this.editWorkshopFormLevelMessage$
  });

  onEditWorkshop(formGroupValue: unknown): void {
    this.workshopEditorService.editWorkshopNameAndSummary(formGroupValue as Workshop)
    .pipe(
      tap(() => this.loading$.next(true)),
      mergeMap (() => this.navigationService.getCurrentSection().pipe(take(1))),
      )
    .subscribe({
      next: (section) => {
        this.loading$.next(false);
        this.navigationService.navigateToSection(section?._id ?? '', true)
        .pipe(take(1), tap(() => this.dialogRef.close()),
        ).subscribe();
      },
      error: () => this.editWorkshopFormLevelMessage$.next(this.errorMessages['httpFailure'])
    });
  }

  onFileSelected(event: Event, formGroup: FormGroup) {
    const element = event.currentTarget as HTMLInputElement;
    const fileList: FileList | null = element.files;
    if (fileList && fileList.length > 0) {
      this.selectedImage = fileList[0];
      const formData = new FormData();
      formData.append('image', this.selectedImage);
      
      this.loading$.next(true)
      this.workshopEditorService.uploadImage(formData)
      .pipe(take(1))
      .subscribe({
        next: ({ success }) => {
          this.loading$.next(false);
          formGroup.get('thumbnail')?.setValue(success?.secure_url);
          formGroup.get('imageURLOrUpload')?.setValue('url');
        },
        error: () => this.editWorkshopFormLevelMessage$.next(this.errorMessages['httpFailure'])
      });
    }
  }
}
