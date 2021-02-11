import { Injectable } from '@angular/core';
import { GamesService } from '@app/services';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { loadGamesSuccessfully, startLoadingGames } from '../actions/game.actions';

@Injectable()
export class GamesEffects {
  loadGames$: Observable<Action> = createEffect(
    () =>
      this.actions$.pipe(
        ofType(startLoadingGames),
        switchMap(() => {
          return this.gameService.getGames();
        }),
        map((games) => loadGamesSuccessfully({ games }))
      ),
    { dispatch: true }
  );

  constructor(private actions$: Actions, private readonly gameService: GamesService) {}
}
