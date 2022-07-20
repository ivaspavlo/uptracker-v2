
import { createAction, props } from '@ngrx/store';
import { ResultState } from '@app/shared/constants';
import { IUserProfile } from '@app/interfaces';
import { IUploadAvatarRes, IChangePasswordReq, IResendOnboardingInviteReq, IValidateOnboardingEmailTokenReq, IValidateOnboardingEmailTokenRes } from '@app/core/services';

export enum ACTION_TYPES {
  GET_USER_PROFILE_DATA = '[CORE USER] Get Profile Data',
  GET_USER_PROFILE_DATA_SUCCESS = '[CORE USER] Get Profile Data Success',
  GET_USER_PROFILE_DATA_FAILURE = '[CORE USER] Get Profile Data Failure',

  UPLOAD_AVATAR = '[CORE USER] Upload Avatar',
  UPLOAD_AVATAR_SUCCESS = '[CORE USER] Upload Avatar Success',
  UPLOAD_AVATAR_FAILURE = '[CORE USER] Upload Avatar Failure',

  CHANGE_PASSWORD = '[CORE USER] Change Password',
  CHANGE_PASSWORD_SUCCESS = '[CORE USER] Change Password Success',
  CHANGE_PASSWORD_FAILURE = '[CORE USER] Change Password Failure',

  UPDATE_PROFILE = '[CORE USER] Update Profile',
  UPDATE_PROFILE_SUCCESS = '[CORE USER] Update Profile Success',
  UPDATE_PROFILE_FAILURE = '[CORE USER] Update Profile Failure',

  RESEND_ONBOARDING_INVITE = '[CORE USER] Resend Onboarding Invite',
  RESEND_ONBOARDING_INVITE_SUCCESS = '[CORE USER] Resend Onboarding Invite Success',
  RESEND_ONBOARDING_INVITE_FAILURE = '[CORE USER] Resend Onboarding Invite Failure',

  VALIDATE_ONBOARDING_EMAIL_TOKEN = '[CORE USER] Validate Onboarding Email Token',
  VALIDATE_ONBOARDING_EMAIL_TOKEN_SUCCESS = '[CORE USER] Validate Onboarding Email Token Success',
  VALIDATE_ONBOARDING_EMAIL_TOKEN_FAILURE = '[CORE USER] Validate Onboarding Email Token Failure'
}

export const getProfileDataAction = createAction(ACTION_TYPES.GET_USER_PROFILE_DATA);
export const getProfileDataSuccessAction = createAction(ACTION_TYPES.GET_USER_PROFILE_DATA_SUCCESS, props<ResultState<IUserProfile>>());
export const getProfileDataFailureAction = createAction(ACTION_TYPES.GET_USER_PROFILE_DATA_FAILURE, props<ResultState<null>>());

export const uploadAvatarAction = createAction(ACTION_TYPES.UPLOAD_AVATAR, props<{ data: FormData }>());
export const uploadAvatarSuccessAction = createAction(ACTION_TYPES.UPLOAD_AVATAR_SUCCESS, props<ResultState<IUploadAvatarRes>>());
export const uploadAvatarFailureAction = createAction(ACTION_TYPES.UPLOAD_AVATAR_FAILURE, props<ResultState<null>>());

export const changePasswordAction = createAction(ACTION_TYPES.CHANGE_PASSWORD, props<IChangePasswordReq>());
export const changePasswordSuccessAction = createAction(ACTION_TYPES.CHANGE_PASSWORD_SUCCESS, props<ResultState<object>>());
export const changePasswordFailureAction = createAction(ACTION_TYPES.CHANGE_PASSWORD_FAILURE, props<ResultState<null>>());

export const updateProfileAction = createAction(ACTION_TYPES.UPDATE_PROFILE, props<IUserProfile>());
export const updateProfileSuccessAction = createAction(ACTION_TYPES.UPDATE_PROFILE_SUCCESS, props<ResultState<IUserProfile>>());
export const updateProfileFailureAction = createAction(ACTION_TYPES.UPDATE_PROFILE_FAILURE, props<ResultState<null>>());

export const resendOnboardingInviteAction = createAction(ACTION_TYPES.RESEND_ONBOARDING_INVITE, props<IResendOnboardingInviteReq>());
export const resendOnboardingInviteSuccessAction = createAction(ACTION_TYPES.RESEND_ONBOARDING_INVITE_SUCCESS, props<ResultState<{ email_address: string; }>>());
export const resendOnboardingInviteFailureAction = createAction(ACTION_TYPES.RESEND_ONBOARDING_INVITE_FAILURE, props<ResultState<null>>());

export const validateOnboardingEmailTokenAction = createAction(ACTION_TYPES.VALIDATE_ONBOARDING_EMAIL_TOKEN, props<IValidateOnboardingEmailTokenReq>());
export const validateOnboardingEmailTokenSuccessAction = createAction(ACTION_TYPES.VALIDATE_ONBOARDING_EMAIL_TOKEN_SUCCESS, props<ResultState<IValidateOnboardingEmailTokenRes>>());
export const validateOnboardingEmailTokenFailureAction = createAction(ACTION_TYPES.VALIDATE_ONBOARDING_EMAIL_TOKEN_FAILURE, props<ResultState<null>>());
