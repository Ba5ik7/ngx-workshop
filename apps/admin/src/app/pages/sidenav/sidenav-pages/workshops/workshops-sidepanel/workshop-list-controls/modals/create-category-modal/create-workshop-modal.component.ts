import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';
import { BehaviorSubject, combineLatest, concatMap, forkJoin, map, mergeAll, mergeMap, Observable, of, switchMap, take, takeUntil, tap } from 'rxjs';
import { NavigationService } from '../../../../../../../../shared/services/navigation/navigation.service';
import { WorkshopEditorService } from '../../../../../../../../shared/services/workshops/workshops.service';
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
  errorMessages: { [key: string]: string } = { required: 'Required', httpFailure: 'Server error'  };
  createWorkshopFormErrorMessages: { [key: string]: string } = {
    name: '', summary: ''
  }

  loading$ = new BehaviorSubject<boolean>(false)
  formGroup$: Observable<FormGroup> = combineLatest({
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
        formGroup.statusChanges.subscribe(() => {
          this.setErrorsMessages(formGroup, this.createWorkshopFormErrorMessages)
        });
      }),
      takeUntil(this.dialogRef.afterClosed())
    ),
    loading: this.loading$.pipe(
      tap((loading) => this.dialogRef.disableClose = loading)
    ),
    createWorkshopFormLevelMessage: this.createWorkshopFormLevelMessage$
  });

  onCreateWorkshop(formGroupValue: unknown) {
    this.workshopEditorService.createWorkshop(formGroupValue as Workshop)
    .pipe(
      tap(() => this.loading$.next(true)),
      mergeMap((result) => {
        return combineLatest({
          workshop: of(result.success),
          workshops: this.navigationService.getWorkshops()
        }).pipe(take(1));
      }),
    )
    .subscribe({
      next: ({ workshop, workshops }) => {
        const newWorkshops = workshops.slice(0);
        workshop && newWorkshops.push(workshop);
        this.navigationService.setWorkshops(newWorkshops);
        this.dialogRef.close();
      },
      error: () => this.createWorkshopFormLevelMessage$.next(this.errorMessages['httpFailure'])
    });
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
