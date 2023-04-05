import { ChangeDetectionStrategy, Component, inject, Inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import { BehaviorSubject, combineLatest, map, mergeMap, switchMap, take, takeUntil, tap } from 'rxjs';
import { WorkshopDocument } from '../../../../../../../../shared/interfaces/navigation.interface';
import { NavigationService } from '../../../../../../../../shared/services/navigation/navigation.service';
import { MatchStringValidator } from '../../../../../../../../shared/validators/match-string.validator';
import { KeyValue, WorkshopEditorService } from '../../../../../../../../shared/services/workshops/workshops.service';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'ngx-delete-page-modal',
  templateUrl: './delete-page-modal.component.html',
  styleUrls: ['./delete-page-modal.component.scss'],
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
export class DeletePageModalComponent {
  private workshopEditorService = inject(WorkshopEditorService);
  private navigationService = inject(NavigationService);
  private dialogRef = inject(MatDialogRef<DeletePageModalComponent>);
  private formBuilder = inject(FormBuilder);
  constructor(@Inject(MAT_DIALOG_DATA) public data: { workshopDocument: WorkshopDocument }) { }

  deletePageFormLevelMessage$ = new BehaviorSubject<string | undefined>(undefined);
  errorMessages: KeyValue = {
    required: 'Required',
    matchString: 'Name does NOT match.',
    httpFailure: 'Server error'
  };
  deletePageControlsErrorMessages: KeyValue = { name: '' }

  loading$ = new BehaviorSubject<boolean>(false)
  formGroup$ = this.navigationService.getCurrentWorkshop().pipe(
    map((workshop) => {
      return this.formBuilder.group({
        _id: [this.data.workshopDocument._id],
        workshopId: [workshop?._id],
        name: ['', [Validators.required]]
      }, { validators: MatchStringValidator('name', this.data.workshopDocument.name) });
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
            this.deletePageControlsErrorMessages,
            this.errorMessages
          );
        });
      }),
    ),
    loading: this.loading$.pipe(tap((loading) => this.dialogRef.disableClose = loading)),
    deletePageFormLevelMessage: this.deletePageFormLevelMessage$,
  });

  onDeletePage(formGroupValue: unknown) {
    const { workshopId } = formGroupValue as { workshopId: string };
    this.workshopEditorService.deletePage(formGroupValue as WorkshopDocument, workshopId)
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
      error: () => this.deletePageFormLevelMessage$.next(this.errorMessages['httpFailure'])
    });
  }
}
