
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { API_URL } from '@env/environment';
import { IAccountUser, IInvitedUser, IAccountData, IAccountPlan } from '@app/interfaces';

export interface IGetAccountUsersReq { location_id: string | null; }
export interface IUpdateAccountUserReq { id: string; email_address: string; name: string; role: string; locations: string[]; status: string; }
export interface IArchiveAccountUserReq { user_id: string; }
export interface IArchiveAccountUserRes { account_users: IAccountUser[]; archived_users: IAccountUser[]; }
export interface IGetArchivedUsersReq { location_id: string | null; }
export interface IReactivateAccountUserRes { account_users: IAccountUser[]; archived_users: IAccountUser[]; }
export interface IGetInvitedUsersReq { location_id: string | null; }
export interface IInviteUserReq { invites: { email_address: string; role: string; locations: string[]; name: string; }[]; invite_id: string; }
export interface IEditInviteUserReq { email_address: string; role: string; locations: string[]; name: string; invite_token: string; }
export interface IDeleteInviteUserReq { invite_token: string; }
export interface ICancelAccountReq { comment: string; reason: string; options: Array<string>; id: string; }

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }

  // CORE ACCOUNT

  public getAccount(): Observable<IAccountData> {
    return this.http.get<IAccountData>(`${API_URL}/accounts`);
  }

  public cancelAccount(id: string, data: ICancelAccountReq): Observable<any> {
    return this.http.put<any>(`${API_URL}/accounts/${id}/cancel`, data);
  }

  public updateAccountSettingsInfo(id: string, data: any): Observable<any> {
    return this.http.put<any>(`${API_URL}/accounts/${id}`, data);
  }

  public getPlans(): Observable<IAccountPlan[]> {
    return this.http.get<IAccountPlan[]>(`${API_URL}/plans`);
  }

  public getCurrentPlan(): Observable<any> {
    return this.http.get<any>(`${API_URL}/subscriptions`);
  }

  // ACCOUNT USERS

  public getAccountUsers({ location_id }: IGetAccountUsersReq): Observable<IAccountUser[]> {
    return this.http.get<IAccountUser[]>(`${API_URL}/users${location_id ? '?location_id=' + location_id : ''}`);
  }

  public updateAccountUser(data: IUpdateAccountUserReq): Observable<any> {
    return this.http.put<any>(`${API_URL}/users/${data.id}`, data);
  }

  public archiveAccountUser({ user_id }: any): Observable<IAccountUser> {
    return this.http.delete<IAccountUser>(`${API_URL}/users/${user_id}`);
  }

  public getArchivedUsers({ location_id }: IGetInvitedUsersReq): Observable<IAccountUser[]> {
    return this.http.get<IAccountUser[]>(`${API_URL}/users/archived${location_id ? '?location_id=' + location_id : ''}`);
  }

  // INVITE USERS

  public getInvitedUsers({ location_id }: IGetInvitedUsersReq): Observable<IInvitedUser[]> {
    return this.http.get<IInvitedUser[]>(`${API_URL}/invites${location_id ? '?location_id=' + location_id : ''}`);
  }

  public inviteUser(data: IInviteUserReq): Observable<IInvitedUser[]> {
    return this.http.post<IInvitedUser[]>(`${API_URL}/invites`, data);
  }

  public editInviteUser(data: IEditInviteUserReq): Observable<IInvitedUser> {
    return this.http.put<IInvitedUser>(`${API_URL}/invites/${data.invite_token}`, data);
  }

  public deleteInviteUser(data: IDeleteInviteUserReq): Observable<IInvitedUser> {
    return this.http.delete<IInvitedUser>(`${API_URL}/invites/${data.invite_token}`);
  }

}
