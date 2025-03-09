import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { BehaviorSubject, combineLatest, map, mergeMap, switchMap, take, takeUntil, tap } from 'rxjs';
import { NavigationService } from '../../../../../../../../shared/services/navigation/navigation.service';
import { KeyValue, WorkshopEditorService } from '../../../../../../../../shared/services/workshops/workshops.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule as MatRatioModule } from '@angular/material/radio';
import { CommonModule } from '@angular/common';
import { WorkshopDocument } from '../../../../../../../../shared/interfaces/navigation.interface';

interface PageType {
  value: string;
  viewValue: string;
}

@Component({
    selector: 'ngx-create-page-modal',
    templateUrl: './create-page-modal.component.html',
    styleUrls: ['./create-page-modal.component.scss'],
    imports: [
        CommonModule,
        MatFormFieldModule,
        MatDialogModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatInputModule,
        MatRatioModule
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreatePageModalComponent {
  private workshopEditorService = inject(WorkshopEditorService);
  private navigationService = inject(NavigationService);
  private dialogRef = inject(MatDialogRef<CreatePageModalComponent>);
  private formBuilder = inject(FormBuilder);

  pageTypes: PageType[] = [
    { value: 'PAGE', viewValue: 'Workshop Page' },
    { value: 'EXAM', viewValue: 'Workshop Exam' },
  ];
  
  createPageFormLevelMessage$ = new BehaviorSubject<string | undefined>(undefined);
  errorMessages: KeyValue = {
    required: 'Required',
  };

  createPageControlsErrorMessages: KeyValue = {
    name: ''
  }

  loading$ = new BehaviorSubject<boolean>(false)
  formGroup$ = this.navigationService.getCurrentWorkshop().pipe(
    map((workshop) => {
      return this.formBuilder.group({
        workshopGroupId: [workshop?.workshopDocumentGroupId],
        workshopId:[workshop?._id],
        sortId:[workshop?.workshopDocuments?.length],
        name: ['', [Validators.required]],
        pageType: ['PAGE', [Validators.required]],
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
            this.createPageControlsErrorMessages,
            this.errorMessages
          );
        });
      }),
    ),
    loading: this.loading$.pipe(tap((loading) => this.dialogRef.disableClose = loading)),
    createPageFormLevelMessage: this.createPageFormLevelMessage$,
  });

  onCreatePage(formGroupValue: unknown) {
    const { workshopId } = formGroupValue as { workshopId: string };
    this.workshopEditorService.createPage(formGroupValue as WorkshopDocument, workshopId)
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
      error: () => this.createPageFormLevelMessage$.next(this.errorMessages['httpFailure'])
    });
  }
}
