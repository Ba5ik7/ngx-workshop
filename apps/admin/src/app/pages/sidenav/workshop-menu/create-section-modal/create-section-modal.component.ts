import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-create-section-modal',
  templateUrl: './create-section-modal.component.html',
  styleUrls: ['./create-section-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateSectionModalComponent implements OnInit {

  destory: Subject<boolean> = new Subject();

  createSectionFormLevelMessage!: string;

  errorMessages: { [key: string]: string } = {
    required: 'Required',
    httpFailure: '😿 Sorry something bad happen. Try again or try refreshing the page.'
  };


  createSectionFormErrorMessages: { [key: string]: string } = {
    sectionTitle: '', summary: '', menuSvgPath: '', headerSvgPath: ''
  }

  createSectionForm: FormGroup = this.formBuilder.group({
    sectionTitle: [],
    summary: [],
    menuSvgPath: [],
    headerSvgPath: []
  });

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<CreateSectionModalComponent>
  ) { }

  ngOnInit(): void {
    this.initCreateSectionsForm();
  }

  initCreateSectionsForm(): void {
    this.createSectionForm.statusChanges
    .pipe(takeUntil(this.destory))
    .subscribe(() => this.setErrorsMessages(this.createSectionForm, this.createSectionFormErrorMessages));
  }

  createSection() {
    console.log('Create section');
    this.dialogRef.close();
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
