import { Game } from '@app/models';
import { createAction, props } from '@ngrx/store';

export enum GameActions {
  StartLoading = '[GameActions] Start loading',
  LoadSuccessfully = '[GameActions] Load successfully',
}

export const startLoadingGames = createAction(GameActions.StartLoading);

export const loadGamesSuccessfully = createAction(
  GameActions.LoadSuccessfully,
  props<{ games: Game[] }>()
);
