
import { createSelector } from '@ngrx/store';
import { LoadingState, DEFAULT_USER_AVATAR } from '@app/shared/constants';
import { get } from '@app/shared/helpers';
import { IUserState } from '../reducers/user.reducer';
import { ICoreModuleState } from '../reducers';


export const selectUserState = (state: ICoreModuleState): IUserState => state.user;

export const selectUserLoading = createSelector(
  selectUserState,
  (state: IUserState) => state.callState === LoadingState.LOADING
);

export const selectUserPasswordResetData = createSelector(
  selectUserState,
  (state: IUserState) => state.password_reset_data
);

export const selectUserProfile = createSelector(
  selectUserState,
  (state: IUserState) => ({ ...state.user_profile, avatar: get(state, 'user_profile.avatar') || DEFAULT_USER_AVATAR })
);

export const selectUserEmail = createSelector(
  selectUserState,
  (state: IUserState) => state.user_profile && state.user_profile.email_address
);

export const selectUserOnboarding = createSelector(
  selectUserState,
  (state: IUserState) => state.user_profile && (state.user_profile.onboarding || state.user_profile.on_boarding) // TODO remove after api change
);

export const selectOnboardingEmailVerifyRes = createSelector(
  selectUserState,
  (state: IUserState) => state.onboarding_email_verify_res
);
