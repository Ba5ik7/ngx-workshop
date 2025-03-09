import { Component, inject, Inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BehaviorSubject, combineLatest, mergeMap, of, take, takeUntil, tap } from 'rxjs';
import { NavigationService } from '../../../../../../../../shared/services/navigation/navigation.service';
import { MatchStringValidator } from '../../../../../../../../shared/validators/match-string.validator';
import { KeyValue, WorkshopEditorService } from '../../../../../../../../shared/services/workshops/workshops.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { Workshop } from '../../../../../../../../shared/interfaces/navigation.interface';

@Component({
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
    ]
})
export class DeleteWorkshopModalComponent {
  private dialogRef = inject(MatDialogRef<DeleteWorkshopModalComponent>);
  private workshopEditorService = inject(WorkshopEditorService);
  private navigationService = inject(NavigationService);
  constructor(@Inject(MAT_DIALOG_DATA) public data: { workshop: Workshop }) { }

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

  onDeleteWorkshop() {
    this.workshopEditorService.deleteWorkshop(this.data.workshop._id)
    .pipe(
      tap(() => this.loading$.next(true)),
      mergeMap(() => this.navigationService.getCurrentSection().pipe(take(1))),
      )
    .subscribe({
      next: (section) => {
        this.loading$.next(false);
        this.navigationService.navigateToSection(section?._id ?? '', true)
        .pipe(take(1), tap(() => this.dialogRef.close()),
        ).subscribe();
      },
      error: () => this.deleteWorkshopFormLevelMessage$.next(this.errorMessages['httpFailure'])
    });
  }
}
