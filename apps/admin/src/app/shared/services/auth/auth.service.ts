import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { IUser } from '../../interfaces/user.interface';
import { IUserMetadata } from '../../interfaces/user-metadata.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  httpClient: HttpClient = inject(HttpClient);

  signInFormErrorSubject = new Subject<number>();
  signInFormError$ = this.signInFormErrorSubject.asObservable();

  signInFormSuccessSubject = new Subject<IUserMetadata>();
  signInFormSuccess$ = this.signInFormSuccessSubject.asObservable();

  signIn(user: IUser) {
    this.httpClient.post<IUser>('/api/authentication/sign-in', user)
    .subscribe({
      next: (userMetadata) => {
        this.signInFormSuccessSubject.next(userMetadata)
      },
      error: (httpError: HttpErrorResponse) => this.signInFormErrorSubject.next(httpError.status)
    });
  }

  isLoggedIn(): Observable<boolean> {
    return this.httpClient.get<boolean>('/api/authentication/is-user-logged-in');
  }
}
