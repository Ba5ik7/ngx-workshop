import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';
import { BehaviorSubject, combineLatest, map, mergeMap, take, takeUntil, tap } from 'rxjs';
import { NavigationService } from '../../../../../../../../shared/services/navigation/navigation.service';
import { KeyValue, WorkshopEditorService } from '../../../../../../../../shared/services/workshops/workshops.service';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { CommonModule } from '@angular/common';
import { Workshop } from '../../../../../../../../shared/interfaces/category.interface';

@Component({
  standalone: true,
  selector: 'ngx-create-workshop-modal',
  templateUrl: './create-workshop-modal.component.html',
  styleUrls: ['./create-workshop-modal.component.scss'],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
  ]
})
export class CreateWorkshopModalComponent {
  private workshopEditorService = inject(WorkshopEditorService);
  private navigationService = inject(NavigationService);
  private dialogRef = inject(MatDialogRef<CreateWorkshopModalComponent>);
  private formBuilder = inject(FormBuilder);

  createWorkshopFormLevelMessage$ = new BehaviorSubject<string | undefined>(undefined);
  errorMessages: KeyValue = {
    required: 'Required',
    httpFailure: 'Server error'
  };
  createWorkshopControlsErrorMessage: KeyValue = {
    name: '', summary: ''
  }

  loading$ = new BehaviorSubject<boolean>(false)
  formGroup$ = combineLatest({
    section: inject(NavigationService).getCurrentSection(),
    workshops: inject(NavigationService).getWorkshops(),
  }).pipe(
    map(({ section, workshops }) => {
      return this.formBuilder.group({
        sectionId:[section?._id],
        sortId:[workshops.length],
        name: ['', [Validators.required]],
        summary: ['', [Validators.required]]
      })
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
            this.createWorkshopControlsErrorMessage,
            this.errorMessages
          );
        });
      }),
    ),
    loading: this.loading$.pipe(tap((loading) => this.dialogRef.disableClose = loading)),
    createWorkshopFormLevelMessage: this.createWorkshopFormLevelMessage$,
  });

  onCreateWorkshop(formGroupValue: unknown) {
    this.workshopEditorService.createWorkshop(formGroupValue as Workshop)
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
      error: () => this.createWorkshopFormLevelMessage$.next(this.errorMessages['httpFailure'])
    });
  }
}
