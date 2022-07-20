
import { get } from '@app/shared/helpers';
import { IPaymentMethodReq, IGetTokenReq } from '@app/interfaces';

export class PaymentMethodReq implements IPaymentMethodReq {
  card_name: string = null;
  billing_details: any = {};
  stripe_token: string = null;
  stripe_error: any;

  constructor({
    address: line1,
    card_name,
    name_on_card,
    city, country,
    postal_code,
    state,
    stripe_res
  }: IGetTokenReq) {
    this.card_name = card_name;
    this.billing_details = {
      name: name_on_card,
      address: { city, country, postal_code, state, line1 }
    };
    this.stripe_error = get(stripe_res, 'error', null);
    this.stripe_token = get(stripe_res, 'id', null);
  }
}
