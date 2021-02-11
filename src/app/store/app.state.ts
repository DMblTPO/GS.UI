import { Game, Order, User, UserProfile } from '@app/models';
import { ActionReducerMap } from '@ngrx/store';
import { gameReducer } from './reducers/game.reducer';
import { orderReducer } from './reducers/order.reducer';
import { userReducer } from './reducers/user.reducer';

export interface OrderState {
  order: Order;
}

export interface UserState {
  user: User;
  profile: UserProfile;
}

export interface GamesState {
  games: Game[];
}

export interface GameStoreState {
  currentUser: UserState;
  gameContent: GamesState;
  currentOrder: OrderState;
}

export const featureGameStoreStateStor = (state: GameStoreState) => state;

export const gameStoreReducers: ActionReducerMap<GameStoreState> = {
  currentUser: userReducer,
  gameContent: gameReducer,
  currentOrder: orderReducer,
};
