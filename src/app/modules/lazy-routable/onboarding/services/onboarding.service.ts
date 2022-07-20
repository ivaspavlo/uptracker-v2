
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { API_URL } from '@env/environment';
import { ILocation } from '@app/interfaces';

export interface IApplyPromoRes {
  created_at: number;
  description: string;
  discount: number;
  id: string;
  one_time_use: boolean;
  plan: string[];
  promo_code: string;
  status: string;
  type: string;
  updated_at: number;
  valid: boolean;
  active?: boolean;
}
export interface ILocationReq {
  id: string;
  name: string;
  image: string;
  full_address: string;
  street_1: string;
  street_2: string;
  suite: string;
  city: string;
  state: string;
  province: string;
  country: string;
  postal_code: string;
  phone_number: string;
  phone_number_ext: string;
  country_code: string;
  fax_number: string;
  fax_number_ext: string;
  fax_country_code: string;
  email_address: string;
  primary_tax_rate: number;
  secondary_tax_rate: number;
}
export interface ILocationUpdateReq { idx: number; location: ILocationReq; }
export interface ILocationUpdateRes { idx: number; location: ILocation; }

@Injectable({
  providedIn: 'root'
})
export class OnboardingService {

  constructor(private http: HttpClient) { }

  public applyPromoCode({ data }: { data: string; }): Observable<IApplyPromoRes> {
    return this.http.get<IApplyPromoRes>(`${API_URL}/promo/code/${ data }`);
  }

}
