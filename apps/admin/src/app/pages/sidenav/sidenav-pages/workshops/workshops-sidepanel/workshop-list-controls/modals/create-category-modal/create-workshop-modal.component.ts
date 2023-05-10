import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { BehaviorSubject, combineLatest, map, mergeMap, take, takeUntil, tap } from 'rxjs';
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
