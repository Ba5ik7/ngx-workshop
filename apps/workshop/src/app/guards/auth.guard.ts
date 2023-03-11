import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';
import { catchError, Observable, of, tap } from 'rxjs';
import { UserStateService } from '../shared/services/user-state/user-state.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivateChild, CanActivate {

  constructor(private userStateService: UserStateService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
        return this.userStateService.isUserLoggedIn();
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
      return this.userStateService.isUserLoggedIn()
      .pipe(
        catchError(() => {
          this.userStateService.openSignInModal.next(true);
          return of(false);
        })
      );
  }
}
