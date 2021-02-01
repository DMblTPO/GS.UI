import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticationService } from '@app/services';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err) => {
        let error = 'Something goes wrong';
        if (err.status === 401) {
          // auto logout if 401 response returned from api
          this.authenticationService.logout();
          error = 'Incorrect Username or Password';
        } else {
          error = err.error.message || error;
        }
        return throwError(error);
      })
    );
  }
}
