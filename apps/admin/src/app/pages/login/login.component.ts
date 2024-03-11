import { HttpStatusCode } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { mergeMap, Subject, takeUntil } from 'rxjs';
import { UserStateService } from '../../shared/services/user-state/user-state.service';
import { AuthService } from '../../shared/services/auth/auth.service';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  standalone: true,
  selector: 'ngx-login',
  template: `
    <mat-card
    appearance="raised">
      <div class="form-container">
        <mat-card-header>
          <h3 mat-card-title>Sign In</h3>
        </mat-card-header>
        <mat-card-content>
        <form [formGroup]="signInForm">
          <span class="form-level-error-message">{{signInFormLevelMessage}}</span>
          <mat-form-field color="accent" appearance="fill">
            <mat-label>Email</mat-label>
            <input matInput #signInEmail type="email" formControlName="email" autocomplete="email" autofocus>
            <mat-error *ngIf="signInForm.get('email')?.errors">{{signInFormErrorMessages['email']}}</mat-error>
          </mat-form-field>
          <mat-form-field color="accent" appearance="fill"> 
            <mat-label>Password</mat-label>
            <input matInput type="password" formControlName="password" autocomplete="current-password">
            <mat-error *ngIf="signInForm.get('password')?.errors">{{signInFormErrorMessages['password']}}</mat-error>
          </mat-form-field>
          <button mat-raised-button color="accent" (click)="signInClick()" [disabled]="signInForm.invalid || formLoading">Sign In</button>
        </form>
        </mat-card-content>
      </div>
    </mat-card>
  `,
  styles: [`
    :host {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100%;
      width: 100%;
    }
    .form-container form {
      display: flex;
      flex-direction: column;
      gap: 5px;
      width: 300px;
      .form-level-error-message { color:  #f44336; }
    }
  `],
  imports: [
    CommonModule,
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ]
})
export class LoginComponent implements OnInit {
  // ! @TODO Make this reactive
  authService = inject(AuthService);
  userStateService = inject(UserStateService);
  formBuilder = inject(FormBuilder);
  router = inject(Router);

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

  ngOnInit(): void {
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
    .pipe(
      takeUntil(this.destory),
      mergeMap(() => this.userStateService.getUserMetadata())
    ).subscribe((user) => this.signSuccuessful(user));
  }

  signInClick(): void {
    this.requestInProgress(true);
    this.authService.signIn(this.signInForm.value);    
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

  requestInProgress(predicate = false) {
    this.formLoading = predicate;
  }

  signSuccuessful(_user: unknown): void {
    this.requestInProgress();
    this.userStateService.signedIn.next(true);
    this.router.navigate(['auth', 'dashboard']);
  }
}
