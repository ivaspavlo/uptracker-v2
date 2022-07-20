import { IApplyPromoRes } from '@app/modules/lazy-routable/onboarding/services/onboarding.service';

export interface IAccountPlan {
  id: string;
  title: string;
  price: number;
  additional_location_price: number;
  additional_location_qty: number;
  features: IAccountPlanFeature[];
  isSelected: boolean;
  end: string;
  start: string;
  coupon_description: string;
  price_discounted: number;
  promo_code?: IApplyPromoRes;
}


export interface IAccountPlanFeature {
  name: string;
  isIncluded: boolean;
}

export interface ISubscription {
  id: string;
  price_discounted: number;
  coupon_description: string;
  start: string;
  end: string;
  title: string;
  price: number;
  additional_location_price: number;
  additional_location_qty: number;
  features: IAccountPlanFeature[];
  isSelected: boolean;
}
