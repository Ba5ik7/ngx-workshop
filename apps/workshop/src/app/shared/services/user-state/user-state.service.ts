import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of, tap, throwError } from 'rxjs';
import { IUserMetadata } from '../../interfaces/user-metadata.interface';

@Injectable({
  providedIn: 'root'
})
export class UserStateService {

  httpClient = inject(HttpClient);

  signedIn = new BehaviorSubject<boolean>(false);
  signedIn$ = this.signedIn.asObservable();

  openSignInModal = new BehaviorSubject<boolean>(false);
  openSignInModal$ = this.openSignInModal.asObservable();

  userMetadata = new BehaviorSubject<IUserMetadata | null>(null);
  userMetadata$ = this.userMetadata.asObservable();

  // is the user logged in?
  isUserLoggedIn(): Observable<boolean> {
    return this.httpClient.get('/api/authentication/is-user-logged-in')
    .pipe(
      tap(() => this.signedIn.next(true)),
      map(() => true),
      catchError((error) => {
        this.signedIn.next(false)
        return throwError(() => error)
      })
    );
  }

  signOut() {
    this.httpClient.get('/api/authentication/sign-out')
    .pipe(tap(() => this.signedIn.next(false)))
    .subscribe();
  }
}
