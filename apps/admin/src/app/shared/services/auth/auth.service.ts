import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { debounceTime, Observable, Subject } from 'rxjs';
import { IUser } from '../../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private httpClient: HttpClient) { }

  signInFormErrorSubject = new Subject<number>();
  signInFormError$ = this.signInFormErrorSubject.asObservable();

  signInFormSuccessSubject = new Subject<Object>();
  signInFormSuccess$ = this.signInFormSuccessSubject.asObservable();

  signIn(user: IUser) {
    this.httpClient.post<Object>('/api/authentication/sign-in', user)
    .subscribe({
      next: (token) => this.signInFormSuccessSubject.next(token),
      error: (httpError: HttpErrorResponse) => this.signInFormErrorSubject.next(httpError.status)
    });
  }

  isLoggedIn(): Observable<boolean> {
    return this.httpClient.get<boolean>('/api/authentication/is-user-logged-in');
  }
}
