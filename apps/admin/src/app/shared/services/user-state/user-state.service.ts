import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, tap, throwError } from 'rxjs';
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
      tap(() => {
        this.signedIn.next(true)
        if(this.userMetadata.value === null) {
          this.getUserMetadata().subscribe();
        }
      }),
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

  getUserMetadata() {
    return this.httpClient.get<IUserMetadata>('/api/authentication/user-metadata')
    .pipe(
      tap((user) => this.userMetadata.next(user)),
      catchError((error) => {
        this.userMetadata.next(null);
        return throwError(() => error);
      })
    );
  }
}
