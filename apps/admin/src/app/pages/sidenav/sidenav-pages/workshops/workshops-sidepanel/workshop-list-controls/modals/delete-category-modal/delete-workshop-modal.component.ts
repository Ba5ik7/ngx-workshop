import { Component, inject, Inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import { BehaviorSubject, combineLatest, mergeMap, of, take, takeUntil, tap } from 'rxjs';
import { NavigationService } from '../../../../../../../../shared/services/navigation/navigation.service';
import { MatchStringValidator } from '../../../../../../../../shared/validators/match-string.validator';
import { KeyValue, WorkshopEditorService } from '../../../../../../../../shared/services/workshops/workshops.service';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { CommonModule } from '@angular/common';
import { Workshop } from '../../../../../../../../shared/interfaces/category.interface';

@Component({
  standalone: true,
  selector: 'ngx-delete-workshop-modal',
  templateUrl: './delete-workshop-modal.component.html',
  styleUrls: ['./delete-workshop-modal.component.scss'],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
  ],
})
export class DeleteWorkshopModalComponent {
  deleteWorkshopFormLevelMessage$ = new BehaviorSubject<string | undefined>(undefined);
  errorMessages: KeyValue = {
    required: 'Required',
    matchString: 'Name does NOT match.',
    httpFailure: 'Server error'
  };
  deleteWorkshopControlsErrorMessages: KeyValue = { name: '' }

  loading$ = new BehaviorSubject<boolean>(false)
  formGroup$ = of(
      inject(FormBuilder).group(
      { name: ['', [Validators.required]] },
      { validators: MatchStringValidator('name', this.data.workshop.name) }
    )
  )

  viewModel$ = combineLatest({
    formGroup: this.formGroup$.pipe(
      tap((formGroup) => {
        formGroup.statusChanges
        .pipe(takeUntil(this.dialogRef.afterClosed()))
        .subscribe(() => {
          this.workshopEditorService.ifErrorsSetMessages(
            formGroup,
            this.deleteWorkshopControlsErrorMessages,
            this.errorMessages
          );
        });
      }),
    ),
    loading: this.loading$.pipe(tap((loading) => this.dialogRef.disableClose = loading)),
    deleteWorkshopFormLevelMessage: this.deleteWorkshopFormLevelMessage$,
  });


  private dialogRef = inject(MatDialogRef<DeleteWorkshopModalComponent>);
  private workshopEditorService = inject(WorkshopEditorService);
  private navigationService = inject(NavigationService);
  constructor(@Inject(MAT_DIALOG_DATA) public data: { workshop: Workshop }) { }

  onDeleteWorkshop() {
    this.workshopEditorService.deleteWorkshop(this.data.workshop._id)
    .pipe(
      tap(() => this.loading$.next(true)),
      mergeMap((result) => {
        return combineLatest({
          data: of(result.success),
          workshops: this.navigationService.getWorkshops()
        }).pipe(take(1));
      }),
    )
    .subscribe({
      next: ({ workshops, data }) => {
        const newWorkshops = workshops.filter((workshop) => {                    
          return workshop._id !== data?.id;
        });
        
        this.navigationService.setWorkshops(newWorkshops);
        this.dialogRef.close();
      },
      error: () => this.deleteWorkshopFormLevelMessage$.next(this.errorMessages['httpFailure'])
    });
  }
}
