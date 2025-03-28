import { CommonModule } from '@angular/common';
import { HttpStatusCode } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  OnDestroy,
  ViewChild
} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import {
  MatFormFieldModule,
  MAT_FORM_FIELD_DEFAULT_OPTIONS
} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Subject, takeUntil } from 'rxjs';
import { UserStateService } from '../../services/user-state/user-state.service';
import { MatchPasswordValidator } from '../../validators/match-passwords.validator';
import { PasswordValidator } from '../../validators/password.validator';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { Router } from '@angular/router';

@Component({
    selector: 'ngx-authenticate-modal',
    templateUrl: './authenticate-modal.component.html',
    styleUrls: ['./authenticate-modal.component.scss'],
    providers: [
      {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'outline'}}
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatButtonModule,
        MatInputModule,
        MatFormFieldModule,
    ]
})
export class AuthenticateModalComponent implements OnInit, OnDestroy {
  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private dialogRef: MatDialogRef<AuthenticateModalComponent>,
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private userStateService: UserStateService,
    private router: Router
  ) { }

  @ViewChild('createAccountEmail') createAccountEmail!: ElementRef;
  @ViewChild('signInEmail') signInEmail!: ElementRef;

  destory: Subject<boolean> = new Subject();

  createAccountFormLevelMessage!: string;
  signInFormLevelMessage!: string;

  errorMessages: { [key: string]: string } = {
    required: 'Required',
    email: 'Invalid email address',
    invalidPassword: 'At least 6 characters long and contain a number',
    matchPassword: 'Password Mismatch',
    duplicateKey: 'Email has been taken. Choose another or login.',
    signInUnauthorized: `Email or password doesn't match`,
    httpFailure: '😿 Sorry something bad happen. Try again or try refreshing the page.'
  };

  signInFormErrorMessages: { [key: string]: string } = {
    email: '', password: ''
  }

  createAccountFormMessages: { [key: string]: string } = {
    email: '', password: '', confirmPassword: ''
  }

  showCreateAccount = false;
  formLoading = false;

  signInForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, PasswordValidator()]]
  });

  createAccountForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, PasswordValidator()]],
    confirmPassword: ['', Validators.required],
  }, { validators: MatchPasswordValidator('confirmPassword', 'password')});

  ngOnInit(): void {
    this.initSignForm();
    this.initCreateAccountForm();
  }

  ngOnDestroy(): void {
    this.destory.next(true);
  }

  initSignForm(): void {
    this.signInForm.statusChanges
    .pipe(takeUntil(this.destory))
    .subscribe(() => this.setErrorsMessages(this.signInForm, this.signInFormErrorMessages));

    this.authenticationService.signInFormError$
    .pipe(takeUntil(this.destory))
    .subscribe((error) => {
      this.requestInProgress();
      if(error === HttpStatusCode.Unauthorized) {
        this.signInForm.get('email')?.setErrors({ signInUnauthorized: true });
        this.signInEmail.nativeElement.focus();
      } else {
        this.signInFormLevelMessage = this.errorMessages['httpFailure'];
        this.changeDetectorRef.markForCheck();
      }
    });

    this.authenticationService.signInFormSuccess$
    .pipe(takeUntil(this.destory))
    .subscribe(() => this.signSuccuessful());
  }

  initCreateAccountForm() {
    this.createAccountForm.statusChanges
    .pipe(takeUntil(this.destory))
    .subscribe(() => this.setErrorsMessages(this.createAccountForm, this.createAccountFormMessages));

    this.authenticationService.createAccountFormError$
    .pipe(takeUntil(this.destory))
    .subscribe((error) => {
      this.requestInProgress();
      if(error === HttpStatusCode.Conflict) {
        this.createAccountForm.get('email')?.setErrors({ duplicateKey: true });
        this.createAccountEmail.nativeElement.focus();
      } else {
        this.createAccountFormLevelMessage = this.errorMessages['httpFailure'];
        this.changeDetectorRef.markForCheck();
      }
    });

    this.authenticationService.createAccountFormSuccess$
    .pipe(takeUntil(this.destory))
    .subscribe(() => this.signSuccuessful());
  }

  signInClick(): void {
    this.requestInProgress(true);
    this.authenticationService.signIn(this.signInForm.value);
  }

  createAccountClick(): void {
    this.requestInProgress(true);
    this.authenticationService.createAccount(this.createAccountForm.value);
  }

  signSuccuessful(): void {
    this.requestInProgress();
    this.userStateService.signedIn.next(true);
    this.router.navigate(['/sidenav/dashboard/overview']);
    this.dialogRef.close();
  }

  requestInProgress(predicate: boolean = false) {
    this.formLoading = predicate;
    this.dialogRef.disableClose = predicate;
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
