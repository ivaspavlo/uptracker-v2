import { createSelector, createFeatureSelector } from '@ngrx/store'
import { SUBSCRIPTION_PLANS, SUBSCRIPTION, CURRENT_PLAN, ERRORS, PROMO_CODE_APPLIED, SUBSCRIPTION_CANCELED } from '@app/modules/lazy-routable/account_settings/constants/keys';
import { ISubscriptionPlanState } from '../../interfaces';

export const selectSubscriptionPlansState = createFeatureSelector<ISubscriptionPlanState>('subscriptionPlan');

export const selecSubscriptionPlans = createSelector(
  selectSubscriptionPlansState,
  (state: ISubscriptionPlanState) => state[SUBSCRIPTION_PLANS]
);

export const selecSubscription = createSelector(
  selectSubscriptionPlansState,
  (state: ISubscriptionPlanState) => state[SUBSCRIPTION]
);

export const seletCurrentPlan = createSelector(
  selectSubscriptionPlansState,
  (state: ISubscriptionPlanState) => state[CURRENT_PLAN]
);

export const seletSelectedPlan = createSelector(
  selectSubscriptionPlansState,
  (state: ISubscriptionPlanState) => state[SUBSCRIPTION_PLANS].find(plan => plan.isSelected)
);

export const seletStateLoading = createSelector(
  selectSubscriptionPlansState,
  (state: ISubscriptionPlanState) => state.callState
);

export const seletErrors = createSelector(
  selectSubscriptionPlansState,
  (state: ISubscriptionPlanState) => state[ERRORS]
);

export const seletPromoCodeApplied = createSelector(
  selectSubscriptionPlansState,
  (state: ISubscriptionPlanState) => state[PROMO_CODE_APPLIED]
);

export const seletSubscriptionCanceled = createSelector(
  selectSubscriptionPlansState,
  (state: ISubscriptionPlanState) => state[SUBSCRIPTION_CANCELED]
);
