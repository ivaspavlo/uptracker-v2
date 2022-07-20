
import { createAction, props } from '@ngrx/store';

import { IInviteUserReq, ICreateSubscriptionRes, ICreateSubscriptionReq } from '@app/interfaces';
import { ResultState } from '@app/shared/constants';
import { IInvitedUser } from '@app/interfaces';

import { IApplyPromoRes } from '../../services/onboarding.service';

export enum ACTION_TYPES {
  APPLY_PROMO_CODE = '[ONBOARDING] Apply Promo Code',
  APPLY_PROMO_CODE_SUCCESS = '[ONBOARDING] Apply Promo Code Success',
  APPLY_PROMO_CODE_FAILURE = '[ONBOARDING] Apply Promo Code Failure',

  CREATE_SUBSCRIPTION = '[ONBOARDING] Create Subscription',
  CREATE_SUBSCRIPTION_SUCCESS = '[ONBOARDING] Create Subscription Success',
  CREATE_SUBSCRIPTION_FAILURE = '[ONBOARDING] Create Subscription Failure',

  INVITE_TEAM = '[ONBOARDING] Invite Team',
  INVITE_TEAM_SUCCESS = '[ONBOARDING] Invite Team Success',
  INVITE_TEAM_FAILURE = '[ONBOARDING] Invite Team Failure',

  CREATE_LOCATION = '[ONBOARDING] Create Location',
  CREATE_LOCATION_SUCCESS = '[ONBOARDING] Create Location Success',
  CREATE_LOCATION_FAILURE = '[ONBOARDING] Create Location Failure',

  EDIT_LOCATION = '[ONBOARDING] Edit Location',
  EDIT_LOCATION_SUCCESS = '[ONBOARDING] Edit Location Success',
  EDIT_LOCATION_FAILURE = '[ONBOARDING] Edit Location Failure',
}

export const applyPromoCodeAction = createAction(ACTION_TYPES.APPLY_PROMO_CODE, props<{ data: string; }>());
export const applyPromoCodeSuccessAction = createAction(ACTION_TYPES.APPLY_PROMO_CODE_SUCCESS, props<ResultState<IApplyPromoRes>>());
export const applyPromoCodeFailureAction = createAction(ACTION_TYPES.APPLY_PROMO_CODE_FAILURE, props<ResultState<null>>());

export const createSubscriptionAction = createAction(ACTION_TYPES.CREATE_SUBSCRIPTION, props<ICreateSubscriptionReq>());
export const createSubscriptionSuccessAction = createAction(ACTION_TYPES.CREATE_SUBSCRIPTION_SUCCESS, props<ResultState<ICreateSubscriptionRes>>());
export const createSubscriptionFailureAction = createAction(ACTION_TYPES.CREATE_SUBSCRIPTION_FAILURE, props<ResultState<null>>());

export const inviteTeamAction = createAction(ACTION_TYPES.INVITE_TEAM, props<IInviteUserReq>());
export const inviteTeamSuccessAction = createAction(ACTION_TYPES.INVITE_TEAM_SUCCESS, props<ResultState<IInvitedUser[]>>());
export const inviteTeamFailureAction = createAction(ACTION_TYPES.INVITE_TEAM_FAILURE, props<ResultState<null>>());

export const createLocationAction = createAction(ACTION_TYPES.CREATE_LOCATION, props<any>());
export const createLocationSuccessAction = createAction(ACTION_TYPES.CREATE_LOCATION_SUCCESS, props<any>());
export const createLocationFailureAction = createAction(ACTION_TYPES.CREATE_LOCATION_FAILURE, props<any>());

export const editLocationAction = createAction(ACTION_TYPES.EDIT_LOCATION, props<any>());
export const editLocationSuccessAction = createAction(ACTION_TYPES.EDIT_LOCATION_SUCCESS, props<any>());
export const editLocationFailureAction = createAction(ACTION_TYPES.EDIT_LOCATION_FAILURE, props<any>());
