import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { IUser } from '../../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  httpClient: HttpClient = inject(HttpClient);

  signInFormErrorSubject = new Subject<number>();
  signInFormError$ = this.signInFormErrorSubject.asObservable();

  signInFormSuccessSubject = new Subject<unknown>();
  signInFormSuccess$ = this.signInFormSuccessSubject.asObservable();

  signIn(user: IUser) {
    this.httpClient.post<unknown>('/api/authentication/sign-in', user)
    .subscribe({
      next: (token) => this.signInFormSuccessSubject.next(token),
      error: (httpError: HttpErrorResponse) => this.signInFormErrorSubject.next(httpError.status)
    });
  }

  isLoggedIn(): Observable<boolean> {
    return this.httpClient.get<boolean>('/api/authentication/is-user-logged-in');
  }
}
