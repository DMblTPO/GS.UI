import { Action, createReducer, on } from '@ngrx/store';
import { loadGamesSuccessfully } from '../actions/game.actions';
import { GamesState } from '../app.state';

const defaultGameContent: GamesState = {
  games: [],
};

const gameReducerCreator = createReducer(
  defaultGameContent,
  on(loadGamesSuccessfully, (state, { games }) => ({ ...state, games }))
);

export function gameReducer(state: GamesState | undefined, action: Action): GamesState {
  return gameReducerCreator(state, action);
}
