import { Action, createReducer, on } from '@ngrx/store';
import { changeUserProfile, loginSuccessUser, logoutUser } from '../actions/user.actions';
import { UserState } from '../app.state';

const defaultUserState: UserState = {
  user: null,
  profile: null,
};

const reducerUserCreator = createReducer(
  defaultUserState,
  on(loginSuccessUser, (state, { user }) => ({ ...state, user })),
  on(changeUserProfile, (state, { profile }) => ({ ...state, profile })),
  on(logoutUser, (state) => ({ ...state, user: null }))
);

export function userReducer(state: UserState | undefined, action: Action): UserState {
  return reducerUserCreator(state, action);
}
