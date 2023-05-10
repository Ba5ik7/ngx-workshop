import { Component, inject, Inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
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

@Component({
  standalone: true,
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
  ],
})
export class EditWorkshopModalComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { workshop: any }) { }
  private workshopEditorService = inject(WorkshopEditorService);
  private navigationService = inject(NavigationService);
  private dialogRef = inject(MatDialogRef<EditWorkshopModalComponent>);
  private formBuilder = inject(FormBuilder);

  editWorkshopFormLevelMessage$ = new BehaviorSubject<string | undefined>(undefined);
  errorMessages: KeyValue = {
    required: 'Required',
  };
  editWorkshopControlsErrorMessages: KeyValue = {
    name: '', summary: ''
  }

  loading$ = new BehaviorSubject<boolean>(false)
  formGroup$ = of(
      inject(FormBuilder).group({
      _id: [this.data.workshop?._id],
      name: [this.data.workshop?.name, [Validators.required]],
      summary: [this.data.workshop?.summary, [Validators.required]]
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
}
