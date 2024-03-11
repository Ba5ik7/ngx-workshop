import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

import { UserStateService } from '../services/user-state/user-state.service';
import { Router } from '@angular/router';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private userStateService: UserStateService, private router: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add auth header with jwt if account is logged in and request is to the api url
    // const user = this.userStateService.getUserToken();
    // const isLoggedIn = user?.accessToken;
    // if (isLoggedIn) {
    //   request = request.clone({
    //       setHeaders: { Authorization: `Bearer ${user.accessToken}` }
    //   });
    // };

    return next.handle(request)
      .pipe(
        catchError(err => {
          this.router.navigate(['/login']);
          const error = err.error.message || err.statusText;
          return throwError(() => new Error(error));
        }
      ));
  }
}
