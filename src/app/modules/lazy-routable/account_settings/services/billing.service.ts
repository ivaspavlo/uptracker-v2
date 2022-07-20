
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { API_URL } from '@env/environment';
import { IBillingHistoryResponce } from '../interfaces';
import { IPaymentMethod, IBillingDetails } from '@app/interfaces';

@Injectable({
  providedIn: 'root'
})
export class BillingService {

  constructor(private http: HttpClient) { }

  public getHistory(page: string = '1'): Observable<IBillingHistoryResponce> {
    const params = new HttpParams().set('page', page);
    return this.http.get<IBillingHistoryResponce>(`${API_URL}/billing/history`, { params });
  }

  public addPaymentMethod(data: IPaymentMethod): Observable<IBillingDetails> {
    return this.http.post<any>(`${API_URL}/payments`, data);
  }

  public updatePaymentMethod(data: IPaymentMethod, paymentMethodID: string): Observable<IBillingDetails> {
    return this.http.put<any>(`${API_URL}/payments/${paymentMethodID}`, data);
  }

  public updateBillingEmail(email: string): Observable<IBillingDetails> {
    return this.http.post<any>(`${API_URL}/billing/email`, {
      billing_email_address: `${email}`
    });
  }

  public deletePaymentMethod(methodId: string): Observable<any> {
    return this.http.delete<any>(`${API_URL}/payments/${methodId}`);
  }

  public setPaymentMethodToActive(methodId: string): Observable<any> {
    return this.http.put<any>(`${API_URL}/payments/${methodId}/active`, { active: true });
  }
}
