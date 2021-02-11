import { Injectable } from '@angular/core';
import { AuthenticationService } from '@app/services';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { loginSuccessUser, loginUser } from '../actions/user.actions';

@Injectable()
export class UserEffects {
  loginUser$: Observable<Action> = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loginUser),
        switchMap((action) => {
          return this.authenticationService.login(action.name, action.password);
        }),
        map((user) => loginSuccessUser({ user }))
      ),
    { dispatch: true }
  );

  constructor(private actions$: Actions, private authenticationService: AuthenticationService) {}
}
