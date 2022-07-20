
import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { map, switchMap, tap } from 'rxjs/operators';

import { ToasterService, UserService, IUploadAvatarReq, IUploadAvatarRes, IChangePasswordReq, IResendOnboardingInviteReq, IResendOnboardingInviteRes, IValidateOnboardingEmailTokenRes, IValidateOnboardingEmailTokenReq, PermissionService } from '@app/core/services';
import { effectsResponseHandler, showResultStateMsgOperator, get } from '@app/shared/helpers';
import { ResultState } from '@app/shared/constants';
import { IUserProfile } from '@app/interfaces';

import { USER_PROFILE_UPDATED_SUCCESS_MSG, UPDATE_PASSWORD_SUCCESS_MSG } from '../../constants/messages';
import * as UserActions from '../actions/user.actions';

@Injectable()
export class UserEffects {

  constructor(
    private actions$: Actions,
    private userService: UserService,
    private toasterService: ToasterService,
    private permissionService: PermissionService
  ) { }

  // CORE USER

  getUserProfileData$ = createEffect((): any => this.actions$.pipe(
    ofType(UserActions.ACTION_TYPES.GET_USER_PROFILE_DATA),
    switchMap(_ => this.userService.getUserProfileData()
      .pipe(
        effectsResponseHandler,
        showResultStateMsgOperator({ service: this.toasterService }),
        tap((payload: ResultState<IUserProfile | null>) => this.userService.saveUserDataInStorage(payload.result)),
        map((payload: ResultState<IUserProfile | null>) => {
          return payload.result ?
            UserActions.getProfileDataSuccessAction(payload) :
            UserActions.getProfileDataFailureAction(payload as ResultState<null>);
        })
      ))
  ));

  uploadUserAvatar$ = createEffect((): any => this.actions$.pipe(
    ofType(UserActions.ACTION_TYPES.UPLOAD_AVATAR),
    switchMap((req: IUploadAvatarReq) => this.userService.uploadAvatar(req)
      .pipe(
        effectsResponseHandler,
        showResultStateMsgOperator({ service: this.toasterService }),
        map((payload: ResultState<IUploadAvatarRes | null>) => {
          return payload.result ?
            UserActions.uploadAvatarSuccessAction(payload) :
            UserActions.uploadAvatarFailureAction(payload as ResultState<null>);
        })
      ))
  ));

  changePassword$ = createEffect((): any => this.actions$.pipe(
    ofType(UserActions.ACTION_TYPES.CHANGE_PASSWORD),
    switchMap((req: IChangePasswordReq) => this.userService.changePassword(req)
      .pipe(
        effectsResponseHandler,
        showResultStateMsgOperator({ service: this.toasterService, success: UPDATE_PASSWORD_SUCCESS_MSG }),
        map((payload: ResultState<object | null>) => {
          return payload.result ?
            UserActions.changePasswordSuccessAction(payload) :
            UserActions.changePasswordFailureAction(payload as ResultState<null>);
        })
    ))
  ));

  updateProfile$ = createEffect((): any => this.actions$.pipe(
    ofType(UserActions.ACTION_TYPES.UPDATE_PROFILE),
    switchMap((req: IUserProfile) => this.userService.updateProfile(req)
      .pipe(
        effectsResponseHandler,
        showResultStateMsgOperator({ service: this.toasterService, success: USER_PROFILE_UPDATED_SUCCESS_MSG }),
        map((payload: ResultState<IUserProfile | null>) => {
          return payload.result ?
            UserActions.updateProfileSuccessAction(payload) :
            UserActions.updateProfileFailureAction(payload as ResultState<null>);
        })
    ))
  ));

  resendOnboardingInvite$ = createEffect((): any => this.actions$.pipe(
    ofType(UserActions.ACTION_TYPES.RESEND_ONBOARDING_INVITE),
    switchMap((req: IResendOnboardingInviteReq) => this.userService.resendOnboardingInvite(req)
      .pipe(
        effectsResponseHandler,
        showResultStateMsgOperator({ service: this.toasterService }),
        map((payload: ResultState<IResendOnboardingInviteRes | null>) => {
          const email_address = get(payload, 'result.valid');
          return email_address ?
            UserActions.resendOnboardingInviteSuccessAction({ ...payload, result: { email_address } }) :
            UserActions.resendOnboardingInviteFailureAction(payload as ResultState<null>);
        })
    ))
  ));

  validateOnboardingEmailToken$ = createEffect((): any => this.actions$.pipe(
    ofType(UserActions.ACTION_TYPES.VALIDATE_ONBOARDING_EMAIL_TOKEN),
    switchMap((req: IValidateOnboardingEmailTokenReq) => this.userService.validateOnboardingEmailToken(req)
      .pipe(
        effectsResponseHandler,
        showResultStateMsgOperator({ service: this.toasterService }),
        map((payload: ResultState<IValidateOnboardingEmailTokenRes | null>) => {
          return payload.result ?
            UserActions.validateOnboardingEmailTokenSuccessAction(payload) :
            UserActions.validateOnboardingEmailTokenFailureAction(payload as ResultState<null>);
        })
    ))
  ));

}
