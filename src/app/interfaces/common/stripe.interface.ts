
export interface IStripeCardReq {
  number: string;
  exp_month: string;
  exp_year: string;
  cvc: number;
}

export interface IStripeSuccessRes {
  client_ip: string;
  created: number;
  id: string;
  livemode: boolean;
  object: string;
  type: string;
  used: boolean;
  card: IStripeCard;
}

export interface IStripeCard {
  last4: string;
  brand: string;
  id: string;
  country: string;
  exp_month: number;
  exp_year: number;
  [key: string]: any; // unused properties
}

export interface IStripeFailureRes {
  error: IStripeError;
}

export interface IStripeError {
  code: string;
  doc_url: string;
  message: string;
  param: string;
  type: string;
}

export type IStripeRes = IStripeSuccessRes | IStripeFailureRes;
