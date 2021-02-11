import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GameStoreState, logoutUser } from '@app/store';
import { Store } from '@ngrx/store';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private readonly store: Store<GameStoreState>) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err) => {
        let error = 'Something goes wrong';
        if (err.status === 401) {
          // auto logout if 401 response returned from api
          this.store.dispatch(logoutUser());
          error = 'Incorrect Username or Password';
        } else {
          error = err.error.message || error;
        }
        return throwError(error);
      })
    );
  }
}
