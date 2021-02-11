import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '@app/models';
import { currentUserStor, GameStoreState } from '@app/store';
import { environment } from '@environments/environment';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  private currentUser: User = null;

  constructor(private readonly store: Store<GameStoreState>) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add auth header with jwt if user is logged in and request is to the api url
    this.store.select(currentUserStor).subscribe((user) => (this.currentUser = user));
    const isLoggedIn = this.currentUser && this.currentUser.token;
    const isApiUrl = request.url.startsWith(environment.apiUrl);
    if (isLoggedIn && isApiUrl) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.currentUser.token}`,
        },
      });
    }

    return next.handle(request);
  }
}
