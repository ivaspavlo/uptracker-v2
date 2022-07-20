
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { API_URL } from '@env/environment';

export interface ICreateSubscriptionReq { stripe_plan_id: string; promo_code: string; locations: number; }
export interface ICreateSubscriptionRes { is_subscribed: boolean; }
export interface IUpdateSubscriptionReq { stripe_plan_id: string; qty: number; }


@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  constructor(private http: HttpClient) { }

  public createSubscription(data: ICreateSubscriptionReq): Observable<ICreateSubscriptionRes> {
    return this.http.post<ICreateSubscriptionRes>(`${API_URL}/subscriptions`, data);
  }

  public updateSubscription(data: IUpdateSubscriptionReq): Observable<any> {
    return this.http.post<any>(`${API_URL}/subscriptions`, data);
  }

  public getSubscription(): Observable<any> {
    return this.http.get<any>(`${API_URL}/subscriptions`);
  }

  public checkPromoCode(promoCode: string): Observable<any> {
    return this.http.get<any>(`${API_URL}/promo/code/${promoCode}`);
  }

  public getPlans(): Observable<any> {
    return this.http.get<any>(`${API_URL}/plans`);
  }
}
