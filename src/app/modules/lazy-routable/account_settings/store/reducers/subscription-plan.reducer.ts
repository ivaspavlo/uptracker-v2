import { ISubscriptionPlanState } from '../../interfaces';
import { Action, createReducer, on } from '@ngrx/store';
import * as SubscriptionPlansActions from './../actions/subscription-plan.actions';
import { SUBSCRIPTION_PLANS, SUBSCRIPTION, CURRENT_PLAN, ERRORS, PROMO_CODE_APPLIED, SUBSCRIPTION_CANCELED } from '../../constants/keys';
import { IAccountPlan } from '@app/interfaces/common';
import { LoadingState } from '@app/shared/constants';


export const initialState: ISubscriptionPlanState = {
  [SUBSCRIPTION_PLANS]: [],
  [SUBSCRIPTION]: null,
  [CURRENT_PLAN]: null,
  [PROMO_CODE_APPLIED]: false,
  [SUBSCRIPTION_CANCELED]: false,
  [ERRORS]: null,
  callState: LoadingState.INIT
};

const subscriptionPlanReducer = createReducer<ISubscriptionPlanState, Action>(
  initialState,
  on(SubscriptionPlansActions.getSubscriptionPlansSuccess, (state: ISubscriptionPlanState, { result }) => {
    return { ...state, [SUBSCRIPTION_PLANS]: result, callState: LoadingState.LOADED };
  }),
  on(SubscriptionPlansActions.getSubscriptionSuccess, (state: ISubscriptionPlanState, { result }) => {
    return { ...state, [SUBSCRIPTION]: result, callState: LoadingState.LOADED };
  }),
  on(SubscriptionPlansActions.selectPlan, (state: ISubscriptionPlanState, { result }) => {
    const isSelected = (plan: IAccountPlan) => (res: IAccountPlan) => plan.id === res.id;
    const planes = state[SUBSCRIPTION_PLANS].map(plan => ({ ...plan, isSelected: isSelected(plan)(result) }));
    return { ...state, [SUBSCRIPTION_PLANS]: [...planes] };
  }),
  on(SubscriptionPlansActions.setSubscriptionPlanAsActive, (state: ISubscriptionPlanState) => {
    return { ...state, callState: LoadingState.LOADING };
  }),
  on(SubscriptionPlansActions.setSubscriptionPlanAsActiveSuccess, (state: ISubscriptionPlanState, { result }) => {
    return { ...state, callState: LoadingState.LOADED };
  }),
  on(SubscriptionPlansActions.checkSubscriptionPlanPromo, (state: ISubscriptionPlanState) => {
    return { ...state, callState: LoadingState.LOADING };
  }),
  on(SubscriptionPlansActions.checkSubscriptionPlanPromoSuccess, (state: ISubscriptionPlanState, { result }) => {
    return { ...state, callState: LoadingState.LOADED, [SUBSCRIPTION]: { ...state[SUBSCRIPTION], promo_code: result }, [PROMO_CODE_APPLIED]: true };
  }),
  on(SubscriptionPlansActions.checkSubscriptionPlanPromoFailure, (state: ISubscriptionPlanState, { result }) => {
    return { ...state, callState: LoadingState.LOADED, [ERRORS]: [{ invalidPromo: true }], [PROMO_CODE_APPLIED]: false };
  }),
  on(SubscriptionPlansActions.setSubscriptionPlanPromo, (state: ISubscriptionPlanState) => {
    return { ...state, callState: LoadingState.LOADING };
  }),
  on(SubscriptionPlansActions.setSubscriptionPlanPromoSuccess, (state: ISubscriptionPlanState, { result }) => {
    return { ...state, callState: LoadingState.LOADED, [PROMO_CODE_APPLIED]: false };
  }),
  on(SubscriptionPlansActions.cancelSubscriptionPlanSuccess, (state: ISubscriptionPlanState, { result }) => {
    return { ...state, callState: LoadingState.LOADED, [SUBSCRIPTION_CANCELED]: true };
  }),
);

export function reducer(state: ISubscriptionPlanState = initialState, action: Action) {
  return subscriptionPlanReducer(state, action);
}
