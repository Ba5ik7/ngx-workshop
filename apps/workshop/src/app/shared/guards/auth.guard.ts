import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, tap } from 'rxjs';
import { UserStateService } from '../services/user-state/user-state.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivateChild, CanActivate {
  constructor(
    private userStateService: UserStateService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.userStateService
      .isUserLoggedIn()
      .pipe(
        tap(
          (loggedIn) =>
            !loggedIn && this.userStateService.openSignInModal.next(true)
        )
      );
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.userStateService
      .isUserLoggedIn()
      .pipe(
        tap(
          (loggedIn) =>
            !loggedIn && this.userStateService.openSignInModal.next(true)
        )
      );
  }
}
