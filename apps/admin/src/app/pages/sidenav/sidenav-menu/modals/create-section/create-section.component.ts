import { CommonModule } from '@angular/common';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDialogRef } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';

@Component({
  standalone: true,
  selector: 'ngx-create-section',
  template: `
    <div class="form-container">
      <h2 mat-dialog-title>Create a Section</h2>
      <form [formGroup]="createSectionForm" mat-dialog-content>
        <span class="form-level-error-message">{{createSectionFormLevelMessage}}</span>
        <mat-form-field color="accent">
          <mat-label>Title</mat-label>
          <input matInput type="text" placeholder="Title" formControlName="sectionTitle">
          <mat-error *ngIf="createSectionForm.get('sectionTitle')?.errors">{{createSectionFormErrorMessages['sectionTitle']}}</mat-error>
        </mat-form-field>
        <mat-form-field color="accent">
          <mat-label>Summary</mat-label>
          <textarea matInput placeholder="Summary" formControlName="summary"></textarea>
          <mat-error *ngIf="createSectionForm.get('summary')?.errors">{{createSectionFormErrorMessages['summary']}}</mat-error>
        </mat-form-field>
        <mat-dialog-actions align="end">
          <button mat-button mat-dialog-close>Cancel</button>
          <button
            mat-raised-button
            color="accent"
            (click)="createSection()">Create</button>
        </mat-dialog-actions>
      </form>
    </div>
  `,
  styles: [`
  .form-container form {
    display: flex;
    flex-direction: column;
    gap: 5px;

    .form-level-error-message {
      color:  #f44336;
    }
  }
`],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
  ]
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
