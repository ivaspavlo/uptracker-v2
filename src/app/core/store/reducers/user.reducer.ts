
import { createReducer, on, Action } from '@ngrx/store';

import { IUserProfile } from '@app/interfaces';
import { CallState, LoadingState, ResultState } from '@app/shared/constants';
import { IUploadAvatarRes, IChangePasswordRes, IValidateResetTokenRes, ILoginRes, ICheckIfEmailAddressInUseRes } from '@app/core/services';

import * as AuthActions from '../actions/auth.actions';
import * as UserActions from '../actions/user.actions';

export interface IUserState {
  user_profile: IUserProfile;
  password_reset_data: IValidateResetTokenRes | null;
  email_address_used: boolean;
  onboarding_email_verify_res: any;
  callState: CallState;
}

const initialState = {
  user_profile: null,
  password_reset_data: null,
  email_address_used: false,
  onboarding_email_verify_res: null,
  callState: LoadingState.INIT
};

const userReducer = createReducer<IUserState, Action>(
  initialState,

  on(AuthActions.logoutSuccessAction, _ => (initialState)),

  // CORE USER

  on(UserActions.getProfileDataAction, (state: IUserState) => ({ ...state, callState: LoadingState.LOADING })),
  on(UserActions.getProfileDataSuccessAction, (state: IUserState, { result, callState }: ResultState<IUserProfile>) => ({ ...state, user_profile: result, callState })),
  on(UserActions.getProfileDataFailureAction, (state: IUserState, { callState }: ResultState<null>) => ({ ...state, callState })),

  on(UserActions.uploadAvatarAction, (state: IUserState) => ({ ...state, callState: LoadingState.LOADING })),
  on(UserActions.uploadAvatarSuccessAction, (state: IUserState, { result, callState }: ResultState<IUploadAvatarRes>) => ({ ...state, user_profile: {...state.user_profile, avatar: result.avatar_url}, callState })),
  on(UserActions.uploadAvatarFailureAction, (state: IUserState, { callState }: ResultState<null>) => ({ ...state, callState })),

  on(UserActions.changePasswordAction, (state: IUserState) => ({ ...state, callState: LoadingState.LOADING })),
  on(UserActions.changePasswordSuccessAction, (state: IUserState, { result, callState }: ResultState<IChangePasswordRes>) => ({ ...state, ...result, callState })),
  on(UserActions.changePasswordFailureAction, (state: IUserState, { callState }: ResultState<null>) => ({ ...state, callState })),

  on(UserActions.updateProfileAction, (state: IUserState) => ({ ...state, callState: LoadingState.LOADING })),
  on(UserActions.updateProfileSuccessAction, (state: IUserState, { result, callState }: ResultState<IUserProfile>) => ({ ...state, ...result, callState })),
  on(UserActions.updateProfileFailureAction, (state: IUserState, { callState }: ResultState<null>) => ({ ...state, callState })),

  on(UserActions.resendOnboardingInviteAction, (state: IUserState) => ({ ...state, callState: LoadingState.LOADING })),
  on(UserActions.resendOnboardingInviteSuccessAction, (state: IUserState, { result, callState }: ResultState<{ email_address: string; }>) => ({ ...state, user_profile: { ...state.user_profile, ...result }, callState })),
  on(UserActions.resendOnboardingInviteFailureAction, (state: IUserState, { callState }: ResultState<null>) => ({ ...state, callState })),

  on(UserActions.validateOnboardingEmailTokenAction, (state: IUserState) => ({ ...state, callState: LoadingState.LOADING })),
  on(UserActions.validateOnboardingEmailTokenSuccessAction, (state: IUserState, { result, callState }: ResultState<any>) => ({ ...state, onboarding_email_verify_res: result, callState })),
  on(UserActions.validateOnboardingEmailTokenFailureAction, (state: IUserState, { callState }: ResultState<null>) => ({ ...state, callState })),

  // AUTH

  on(AuthActions.loginAction, (state: IUserState) => ({ ...state, callState: LoadingState.LOADING })),
  on(AuthActions.loginSuccessAction, (state: IUserState, { result, callState }: ResultState<ILoginRes>) => ({ ...state, user_profile: result.user, callState })),
  on(AuthActions.loginFailureAction, (state: IUserState, { callState }: ResultState<null>) => ({ ...state, callState })),

  on(AuthActions.signinAction, (state: IUserState) => ({ ...state, callState: LoadingState.LOADING })),
  on(AuthActions.signinSuccessAction, (state: IUserState, { result, callState }: ResultState<ILoginRes>) => ({ ...state, user_profile: result.user, callState })),
  on(AuthActions.signinFailureAction, (state: IUserState, { callState }: ResultState<null>) => ({ ...state, callState })),

  on(AuthActions.remindPasswordAction, (state: IUserState) => ({ ...state, callState: LoadingState.LOADING })),
  on(AuthActions.remindPasswordSuccessAction, (state: IUserState) => ({ ...state, callState: LoadingState.LOADED })),
  on(AuthActions.remindPasswordFailureAction, (state: IUserState) => ({ ...state, callState: LoadingState.LOADED })),

  on(AuthActions.resetPasswordAction, (state: IUserState) => ({ ...state, callState: LoadingState.LOADING })),
  on(AuthActions.resetPasswordSuccessAction, (state: IUserState, { callState }: ResultState<null>) => ({ ...state, callState })),
  on(AuthActions.resetPasswordFailureAction, (state: IUserState, { callState }: ResultState<null>) => ({ ...state, callState })),

  on(AuthActions.validateResetTokenAction, (state: IUserState) => ({ ...state, callState: LoadingState.LOADING })),
  on(AuthActions.validateResetTokenSuccessAction, (state: IUserState, { result, callState }: ResultState<IValidateResetTokenRes>) => ({ ...state, password_reset_data: result, callState })),
  on(AuthActions.validateResetTokenFailureAction, (state: IUserState, { callState }: ResultState<IValidateResetTokenRes>) => ({ ...state, password_reset_data: null, callState })),

  on(AuthActions.checkIfEmailAddressInUseAction, (state: IUserState) => ({ ...state, callState: LoadingState.LOADING })),
  on(AuthActions.checkIfEmailAddressInUseSuccessAction, (state: IUserState, { result, callState }: ResultState<ICheckIfEmailAddressInUseRes>) => ({ ...state, ...result, callState })),
  on(AuthActions.checkIfEmailAddressInUseFailureAction, (state: IUserState, { callState }: ResultState<null>) => ({ ...state, email_address_used: null, callState }))
);

export default function(state: IUserState, action: Action) {
  return userReducer(state, action);
}
