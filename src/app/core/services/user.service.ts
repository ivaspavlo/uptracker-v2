
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { API_URL } from '@env/environment';
import { IUserProfile, IRole, IOnboarding } from '@app/interfaces';
import { AppStorageService } from '@app/core/services/app-storage.service';
import { TOKEN_KEY, USER_ID_KEY, USER_ONBOARDING, USER_ROLE } from '@app/shared/constants';


export interface IUploadAvatarReq { data: FormData; }
export interface IUploadAvatarRes { avatar_url: string; }
export interface IChangePasswordReq { password: string; }
export interface IChangePasswordRes { [key: string]: any; }
export interface IResendOnboardingInviteReq { email_address: string; }
export interface IResendOnboardingInviteRes { valid: string; }
export interface IValidateOnboardingEmailTokenReq { email_verification_token: string; }
export interface IValidateOnboardingEmailTokenRes { valid: boolean; }

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
    private storageService: AppStorageService
  ) { }

  public getUserProfileData(): Observable<IUserProfile> {
    return this.http.get<IUserProfile>(`${API_URL}/profile`);
  }

  public uploadAvatar({ data }: IUploadAvatarReq): Observable<IUploadAvatarRes> {
    return this.http.post<IUploadAvatarRes>(`${API_URL}/profile/avatar`, data);
  }

  public changePassword(data: IChangePasswordReq): Observable<object> {
    return this.http.put<object>(`${API_URL}/profile/password`, data);
  }

  public updateProfile(data: IUserProfile): Observable<IUserProfile> {
    return this.http.put<IUserProfile>(`${API_URL}/profile`, data);
  }

  public resendOnboardingInvite(data: { email_address: string; }): Observable<IResendOnboardingInviteRes> {
    return this.http.post<IResendOnboardingInviteRes>(`${API_URL}/resend/verify/email`, data);
  }

  public validateOnboardingEmailToken(data: IValidateOnboardingEmailTokenReq): Observable<IValidateOnboardingEmailTokenRes> {
    return this.http.post<IValidateOnboardingEmailTokenRes>(`${API_URL}/verify/email`, data);
  }

  // STORAGE METHODS

  public saveTokenInStorage(token: string): void {
    this.storageService.set(TOKEN_KEY, token);
  }

  public saveUserDataInStorage(user: IUserProfile): void {
    this.storageService.set(USER_ID_KEY, user.id);
    this.storageService.set(USER_ONBOARDING, JSON.stringify(user.onboarding || user.on_boarding)); // TODO remove after api change
    this.storageService.set(USER_ROLE, JSON.stringify(user.role));
  }

  public removeAllDataFromStorage(): void {
    this.storageService.remove(TOKEN_KEY);
    this.storageService.remove(USER_ID_KEY);
    this.storageService.remove(USER_ONBOARDING);
    this.storageService.remove(USER_ROLE);
  }

  public getOnboardingStateFromStorage(): IOnboarding {
    const onboarding = this.storageService.get(USER_ONBOARDING);
    return onboarding ? JSON.parse(onboarding) : null;
  }

  public getRoleFromStorage(): IRole {
    const role = this.storageService.get(USER_ROLE);
    return role ? JSON.parse(role) : null;
  }

  public isCredentialsInStorage(): boolean {
    return !!(this.storageService.get(TOKEN_KEY) && this.storageService.get(USER_ID_KEY));
  }

}
