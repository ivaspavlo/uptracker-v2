import { createAction, props } from '@ngrx/store';
import { ResultState } from '@app/shared/constants';

import { IAccountPlan, ISubscription } from '@app/interfaces/common';
import { IUpdateSubscriptionReq, ICreateSubscriptionReq, ICreateSubscriptionRes, IApplyPromoRes } from '@app/interfaces/features';
import { ICancelAccountReq } from '@app/core/services';


export enum ACTION_TYPES {
  SUBSCRUPTION_PLAN_GET_PLANS = '[SUBSCRUPTION_PLAN get plans]',
  SUBSCRUPTION_PLAN_GET_PLANS_SUCCESS = '[SUBSCRUPTION_PLAN get plans success]',
  SUBSCRUPTION_PLAN_GET_SUBSCRIPTION = '[SUBSCRUPTION_PLAN get plans subscription]',
  SUBSCRUPTION_PLAN_GET_SUBSCRIPTION_SUCCESS = '[SUBSCRUPTION_PLAN get plans subscription success]',
  SELECT_PLAN = '[SUBSCRUPTION_PLAN select plan]',
  SUBSCRUPTION_PLAN_GET_CURRENT_PLAN = '[SUBSCRUPTION_PLAN get current plan]',
  SUBSCRUPTION_PLAN_GET_SELECTED_PLAN = '[SUBSCRUPTION_PLAN get selected plan]',
  SUBSCRUPTION_PLAN_SET_AS_ACTIVE = '[SUBSCRUPTION_PLAN set plan as active]',
  SUBSCRUPTION_PLAN_SET_AS_ACTIVE_SUCCESS = '[SUBSCRUPTION_PLAN set plan as active success]',

  SUBSCRUPTION_PLAN_CHECK_PROMO = '[SUBSCRUPTION_PLAN subscription plan check promo code]',
  SUBSCRUPTION_PLAN_CHECK_PROMO_SUCCESS = '[SUBSCRUPTION_PLAN subscription plan check promo code success]',
  SUBSCRUPTION_PLAN_CHECK_PROMO_FAILURE = '[SUBSCRUPTION_PLAN subscription plan check promo code failure]',

  SUBSCRUPTION_PLAN_SET_PROMO = '[SUBSCRUPTION_PLAN subscription plan set promo code]',
  SUBSCRUPTION_PLAN_SET_PROMO_SUCCESS = '[SUBSCRUPTION_PLAN subscription plan set promo code success]',
  SUBSCRUPTION_PLAN_SET_PROMO_FAILURE = '[SUBSCRUPTION_PLAN subscription plan set promo code failure]',

  SUBSCRUPTION_PLAN_CANCEL= '[SUBSCRUPTION_PLAN cancel]',
  SUBSCRUPTION_PLAN_CANCEL_SUCCESS= '[SUBSCRUPTION_PLAN cancel success]',

}


export const getSubscriptionPlans = createAction(ACTION_TYPES.SUBSCRUPTION_PLAN_GET_PLANS);
export const getSubscriptionPlansSuccess = createAction(ACTION_TYPES.SUBSCRUPTION_PLAN_GET_PLANS_SUCCESS, props<ResultState<IAccountPlan[]>>());
export const getSubscription = createAction(ACTION_TYPES.SUBSCRUPTION_PLAN_GET_SUBSCRIPTION);
export const getSubscriptionSuccess = createAction(ACTION_TYPES.SUBSCRUPTION_PLAN_GET_SUBSCRIPTION_SUCCESS, props<ResultState<ISubscription>>());
export const selectPlan = createAction(ACTION_TYPES.SELECT_PLAN, props<ResultState<IAccountPlan>>());
export const getCurrentPlan = createAction(ACTION_TYPES.SUBSCRUPTION_PLAN_GET_CURRENT_PLAN);
export const getSelectedPlan = createAction(ACTION_TYPES.SUBSCRUPTION_PLAN_GET_SELECTED_PLAN);

export const setSubscriptionPlanAsActive = createAction(ACTION_TYPES.SUBSCRUPTION_PLAN_SET_AS_ACTIVE, props<any>());
export const setSubscriptionPlanAsActiveSuccess = createAction(ACTION_TYPES.SUBSCRUPTION_PLAN_SET_AS_ACTIVE_SUCCESS, props<ResultState<ICreateSubscriptionRes>>());

export const checkSubscriptionPlanPromo = createAction(ACTION_TYPES.SUBSCRUPTION_PLAN_CHECK_PROMO, props<ICreateSubscriptionReq>());
export const checkSubscriptionPlanPromoSuccess = createAction(ACTION_TYPES.SUBSCRUPTION_PLAN_CHECK_PROMO_SUCCESS, props<ResultState<IApplyPromoRes>>());
export const checkSubscriptionPlanPromoFailure = createAction(ACTION_TYPES.SUBSCRUPTION_PLAN_CHECK_PROMO_FAILURE, props<ResultState<IApplyPromoRes>>());

export const setSubscriptionPlanPromo = createAction(ACTION_TYPES.SUBSCRUPTION_PLAN_SET_PROMO, props<ICreateSubscriptionReq>());
export const setSubscriptionPlanPromoSuccess = createAction(ACTION_TYPES.SUBSCRUPTION_PLAN_SET_PROMO_SUCCESS, props<ResultState<IApplyPromoRes>>());
export const setSubscriptionPlanPromoFailure = createAction(ACTION_TYPES.SUBSCRUPTION_PLAN_SET_PROMO_FAILURE, props<ResultState<IApplyPromoRes>>());

export const cancelSubscriptionPlan = createAction(ACTION_TYPES.SUBSCRUPTION_PLAN_CANCEL, props<any>());
export const cancelSubscriptionPlanSuccess = createAction(ACTION_TYPES.SUBSCRUPTION_PLAN_CANCEL_SUCCESS, props<any>());
