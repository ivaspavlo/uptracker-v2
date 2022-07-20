
import { SUBSCRIPTION_PLANS, SUBSCRIPTION, CURRENT_PLAN, ERRORS, PROMO_CODE_APPLIED, SUBSCRIPTION_CANCELED } from '../constants/keys';
import { IAccountPlan, ISubscription } from '@app/interfaces/common';
import { CallState } from '@app/shared/constants/call-state';

export interface ISubscriptionPlanState {
  [SUBSCRIPTION_PLANS]: IAccountPlan[];
  [SUBSCRIPTION]: ISubscription;
  [CURRENT_PLAN]: IAccountPlan;
  [ERRORS]: Array<any>;
  [PROMO_CODE_APPLIED]: boolean;
  [SUBSCRIPTION_CANCELED]: boolean;
  callState: CallState;
}

