
import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { API_URL } from '@env/environment';
import { StripeCardReq } from '@app/shared/models';
import { IBillingCard, IStripeError, IStripeRes } from '@app/interfaces';

export interface IGetTokenReq extends IBillingCard { stripe_res: IStripeRes; }
export interface IGetTokenRes { [key: string]: any; }
export interface IPaymentMethodRes { [key: string]: any; }
export interface IPaymentMethodReq {
  card_name: string;
  billing_details: {
    address: {
      city: string;
      country: string;
      postal_code: string;
      state: string;
    },
    name: string;
  };
  stripe_token: string;
  stripe_error: IStripeError;
}

@Injectable({
  providedIn: 'root'
})
export class PaymentCardService {

  constructor(
    private ngZone: NgZone,
    private http: HttpClient
  ) { }

  public getToken(card: IBillingCard): Observable<string> {
    return new Observable<string>((observer) => {
      Stripe.card.createToken(
        new StripeCardReq(card), (status: number, response: any) => this.ngZone.run(() => observer.next(response))
      );
    });
  }

  public setPaymentMethod(data: IPaymentMethodReq): Observable<IPaymentMethodRes> {
    return this.http.post<IPaymentMethodRes>(`${API_URL}/payments`, data);
  }

}
