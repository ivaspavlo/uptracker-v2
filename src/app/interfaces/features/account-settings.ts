import { IStripeError } from '../common';

export interface IPlan {
  additional_location_price: number;
  additional_location_qty: number;
  coupon_description: string;
  end: string;
  features: Array<any>;
  id: string;
  price: number;
  price_discounted: number;
  start: string;
  title: string;
}

export interface IPaymentRes {
  billing_details: {};
  stripe_error: IStripeError;
  stripe_token: string;
}
