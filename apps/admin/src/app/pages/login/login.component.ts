import { HttpStatusCode } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {  FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { UserStateService } from '../../shared/services/user-state/user-state.service';
import { AuthService } from '../../shared/services/auth/auth.service';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @ViewChild('signInEmail') signInEmail!: ElementRef;

  destory: Subject<boolean> = new Subject();

  signInFormLevelMessage!: string;
  formLoading = false;

  signInFormErrorMessages: { [key: string]: string } = {
    email: '', password: ''
  }

  signInForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });

  errorMessages: { [key: string]: string } = {
    required: 'Required',
    email: 'Invalid email address',
    invalidPassword: 'At least 6 characters long and contain a number',
    signInUnauthorized: `Email or password doesn't match`,
    httpFailure: '😿 Sorry something bad happen. Try again or try refreshing the page.'
  };

  constructor(
    private authService: AuthService,
    private userStateService: UserStateService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.initSignForm();
  }

  signInClick(): void {
    this.requestInProgress(true);
    this.authService.signIn(this.signInForm.value);    
  }

  initSignForm(): void {
    this.signInForm.statusChanges
    .pipe(takeUntil(this.destory))
    .subscribe(() => this.setErrorsMessages(this.signInForm, this.signInFormErrorMessages));
  
    this.authService.signInFormError$
    .pipe(takeUntil(this.destory))
    .subscribe((error) => {      
      this.requestInProgress();
      if(error === HttpStatusCode.Unauthorized) {
        this.signInForm.get('email')?.setErrors({ signInUnauthorized: true });
        this.signInEmail.nativeElement.focus();
      } else {
        this.signInFormLevelMessage = this.errorMessages['httpFailure'];
      }
    });
    
    this.authService.signInFormSuccess$
    .pipe(takeUntil(this.destory))
    .subscribe((user) => this.signSuccuessful(user));
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

  requestInProgress(predicate: boolean = false) {
    this.formLoading = predicate;
  }

  signSuccuessful(whatever: any): void {
    this.requestInProgress();
    this.userStateService.setUserToken(whatever);
    this.router.navigate(['auth', 'dashboard']);
  }
}
