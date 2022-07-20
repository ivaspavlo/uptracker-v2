
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { API_URL } from '@env/environment';
import { IUserProfile, IAccountData } from '@app/interfaces';

export interface ILoginReq { email_address: string; password: string; }
export interface ILoginRes { user: IUserProfile; account: IAccountData; token: string; }
export interface IValidateResetTokenReq { password_reset_token: string; }
export interface IValidateResetTokenRes { password_reset_token: string; user_id: string; valid: boolean; }
export interface IRemindPasswordReq { email_address: string; }
export interface IRemindPasswordRes { token: string; }
export interface IPasswordResetReq { password: string; confirm_password: string; user_id: string; password_reset_token: string; }
export interface ICheckIfEmailAddressInUseReq { email_address: string; }
export interface ICheckIfEmailAddressInUseRes { email_address_used: boolean; }
export interface IUserRegisterReq {
  password: string;
  confirm_password: string;
  email_address: string;
  name: string;
  company_name: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  public login(data: ILoginReq): Observable<ILoginRes> {
    return this.http.post<ILoginRes>(`${ API_URL }/login`, data);
  }

  public forgot(data: IRemindPasswordReq): Observable<IRemindPasswordRes> {
    return this.http.post<IRemindPasswordRes>(`${ API_URL }/forgotten/password`, data);
  }

  public validateResetToken(data: IValidateResetTokenReq): Observable<IValidateResetTokenRes> {
    return this.http.post<IValidateResetTokenRes>(`${ API_URL }/reset/password/check`, data).pipe(
      map(res => ({ ...res, ...data }))
    );
  }

  public resetPassword(data: IPasswordResetReq): Observable<null> {
    return this.http.post<null>(`${ API_URL }/reset/password`, data);
  }

  public validateEmailAddress(data: ICheckIfEmailAddressInUseReq): Observable<ICheckIfEmailAddressInUseRes> {
    return this.http.post<ICheckIfEmailAddressInUseRes>(`${ API_URL }/check/email`, data);
  }

  public signin(data: IUserRegisterReq): Observable<ILoginRes> {
    return this.http.post<ILoginRes>(`${ API_URL }/register`, data);
  }

}
