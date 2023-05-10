import { ChangeDetectionStrategy, Component, inject, Inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BehaviorSubject, combineLatest, map, mergeMap, switchMap, take, takeUntil, tap } from 'rxjs';
import { WorkshopDocument } from '../../../../../../../../shared/interfaces/navigation.interface';
import { NavigationService } from '../../../../../../../../shared/services/navigation/navigation.service';
import { KeyValue, WorkshopEditorService } from '../../../../../../../../shared/services/workshops/workshops.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'ngx-edit-page-modal',
  templateUrl: './edit-page-modal.component.html',
  styleUrls: ['./edit-page-modal.component.scss'],
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
export class EditPageModalComponent {
  private workshopEditorService = inject(WorkshopEditorService);
  private navigationService = inject(NavigationService);
  private dialogRef = inject(MatDialogRef<EditPageModalComponent>);
  private formBuilder = inject(FormBuilder);
  constructor(@Inject(MAT_DIALOG_DATA) public data: { workshopDocument: WorkshopDocument }) { }

  editPageFormLevelMessage$ = new BehaviorSubject<string | undefined>(undefined);
  errorMessages: KeyValue = {
    required: 'Required',
    httpFailure: 'Server error'
  };
  editPageControlsErrorMessages: KeyValue = { name: '', summary: '' }

  loading$ = new BehaviorSubject<boolean>(false)
  formGroup$ = this.navigationService.getCurrentWorkshop().pipe(
    map((workshop) => {
      return this.formBuilder.group({
        _id: [this.data.workshopDocument._id],
        workshopGroupId: [workshop?._id],
        name: [this.data.workshopDocument.name, [Validators.required]]
      });
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
            this.editPageControlsErrorMessages,
            this.errorMessages
          );
        });
      }),
    ),
    loading: this.loading$.pipe(tap((loading) => this.dialogRef.disableClose = loading)),
    editPageFormLevelMessage: this.editPageFormLevelMessage$,
  });

  onEditPage(formGroupValue: unknown) {
    this.workshopEditorService.editPageName(formGroupValue as WorkshopDocument)
    .pipe(
      tap(() => this.loading$.next(true)),
      mergeMap(() => this.navigationService.getCurrentWorkshop().pipe(take(1))),
    )
    .subscribe({
      next: (workshop) => {        
        this.navigationService.navigateToSection(workshop?.sectionId ?? '', true)
        .pipe(
          take(1),
          switchMap(() => this.navigationService.navigateToWorkshop(workshop?.workshopDocumentGroupId ?? '')),
          tap(() => this.dialogRef.close())
        ).subscribe();
      },
      error: () => this.editPageFormLevelMessage$.next(this.errorMessages['httpFailure'])
    });
  }
}
