
import { IStripeCardReq, IBillingCard } from '@app/interfaces';

export class StripeCardReq implements IStripeCardReq {
  public number: string;
  public exp_month: string;
  public exp_year: string;
  public cvc: number;

  constructor({ card_number, exp_date, cvv }: IBillingCard) {
    const [ exp_month, exp_year ] = exp_date.split('/');
    this.exp_month = exp_month;
    this.exp_year = exp_year;
    this.number = card_number.split(' ').join('');
    this.cvc = cvv;
  }
}
