import { User, UserProfile } from '@app/models';
import { createAction, props } from '@ngrx/store';

export enum UserActions {
  Login = '[UserActions] Login',
  LoginSuccess = '[UserActions] Login success',
  ChangeProfile = '[UserActions] Change profile',
  Logout = '[UserActions] Logout',
}

export const loginUser = createAction(
  UserActions.Login,
  props<{ name: string; password: string }>()
);

export const loginSuccessUser = createAction(UserActions.LoginSuccess, props<{ user: User }>());

export const logoutUser = createAction(UserActions.Logout);

export const changeUserProfile = createAction(
  UserActions.ChangeProfile,
  props<{ profile: UserProfile }>()
);
