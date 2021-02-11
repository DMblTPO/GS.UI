import { createSelector } from '@ngrx/store';
import { featureGameStoreStateStor } from '../app.state';

export const allGamesStor = createSelector(
  featureGameStoreStateStor,
  (state) => state.gameContent.games
);
