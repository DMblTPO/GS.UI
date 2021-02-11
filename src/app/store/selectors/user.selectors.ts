import { createSelector } from '@ngrx/store';
import { featureGameStoreStateStor } from '../app.state';

export const currentUserStor = createSelector(
  featureGameStoreStateStor,
  (state) => state.currentUser.user
);
