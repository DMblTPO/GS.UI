import { Game } from '@app/models';
import { createSelector } from '@ngrx/store';
import { featureGameStoreStateStor } from '../app.state';

export const allGamesStor = createSelector(
  featureGameStoreStateStor,
  (state) => state.gameContent.games
);

export const gameStor = createSelector(allGamesStor, (games: Game[], props: { id: number }) =>
  games.find((x) => x.id === props.id)
);
