
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { MatDialog } from '@angular/material/dialog';

import { of, Observable } from 'rxjs';
import { map, mergeMap, catchError, switchMap, tap } from 'rxjs/operators';

import { LOGIN_URL, BASE_URL, ToastTypes, DIALOG_SIZES, DEFAULT_ERROR_MSG, EMAIL_IS_USED_MSG, ResultState, LoadingState } from '@app/shared/constants';
import { AuthService, ToasterService, SocketService, UserService, ILoginReq, ILoginRes, IUserRegisterReq, ICheckIfEmailAddressInUseRes, IRemindPasswordReq, IPasswordResetReq, ICheckIfEmailAddressInUseReq, IValidateResetTokenReq, IValidateResetTokenRes } from '@app/core/services';
import { InfoModalComponent, IInfoModalData } from '@app/modules/non-lazy-routable';
import { get, effectsResponseHandler, showResultStateMsgOperator, getHttpResponseErrorMsg } from '@app/shared/helpers';

import { FORGOT_PASSWORD_MODAL_TITLE, FORGOT_PASSWORD_MODAL_MSG, RESET_PASSWORD_SUCCESS_MSG, RESET_TOKEN_INVALID_MSG, RESET_PASSWORD_MODAL_TITLE, FORGOT_PASSWORD_MODAL_BTN_NAME } from '../../constants/messages';
import * as AuthActions from '../actions/auth.actions';

@Injectable()
export class AuthEffects {

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private toasterService: ToasterService,
    private userService: UserService,
    private router: Router,
    private dialog: MatDialog,
    private socketService: SocketService
  ) { }

  login$ = createEffect((): any => this.actions$.pipe(
    ofType(AuthActions.ACTION_TYPES.LOGIN),
    mergeMap((req: ILoginReq) => this.authService.login(req)
      .pipe(
        effectsResponseHandler,
        showResultStateMsgOperator({ service: this.toasterService }),
        map((payload: ResultState<ILoginRes | null>) => {
          if (!payload.result) { return AuthActions.loginFailureAction(payload as ResultState<null>); }
          this.userService.saveTokenInStorage(get(payload.result, 'token'));
          this.userService.saveUserDataInStorage(get(payload.result, 'user'));
          this.socketService.init();
          this.router.navigateByUrl(BASE_URL);
          return AuthActions.loginSuccessAction(payload);
        })
      ))
  ));

  logout$ = createEffect((): any => this.actions$.pipe(
    ofType(AuthActions.ACTION_TYPES.LOGOUT),
    map(_ => {
      this.userService.removeAllDataFromStorage();
      this.router.navigateByUrl(LOGIN_URL);
      this.socketService.shutdown();
      return { type: AuthActions.ACTION_TYPES.LOGOUT_SUCCESS };
    }),
    catchError(_ => {
      this.toasterService.pop(DEFAULT_ERROR_MSG, ToastTypes.error);
      return of({ type: AuthActions.ACTION_TYPES.LOGOUT_FAILURE });
    })
  ));

  signin$ = createEffect((): any => this.actions$.pipe(
    ofType(AuthActions.ACTION_TYPES.SIGNIN),
    mergeMap((req: IUserRegisterReq) =>
      this.authService.validateEmailAddress({ email_address: req.email_address })
        .pipe(
          switchMap((res: ICheckIfEmailAddressInUseRes | null) => {
            if (res && !res.email_address_used) { return this.authService.signin(req).pipe(effectsResponseHandler); }
            const errorMsg = EMAIL_IS_USED_MSG;
            this.toasterService.pop(errorMsg, ToastTypes.error);
            return of({ result: null, callState: { errorMsg } });
          }),
          map((payload: ResultState<ILoginRes | null>) => {
            if (!payload.result) { return AuthActions.signinFailureAction(payload as ResultState<null>); }
            this.userService.saveTokenInStorage((payload.result as ILoginRes).token);
            this.userService.saveUserDataInStorage(get(payload.result, 'user'));
            this.router.navigateByUrl(BASE_URL);
            return AuthActions.signinSuccessAction(payload);
          })
        ))
  ));

  remindPassword$ = createEffect((): any => this.actions$.pipe(
    ofType(AuthActions.ACTION_TYPES.REMIND_PASSWORD),
    mergeMap((req: IRemindPasswordReq) => this.authService.forgot(req)
      .pipe(
        map(_ => null),
        catchError((err: HttpErrorResponse) => {
          const errorMsg = getHttpResponseErrorMsg(err);
          if (errorMsg) { this.toasterService.pop(errorMsg, ToastTypes.error); }
          return of(errorMsg);
        }),
        switchMap((errorMsg: string | null) => !errorMsg ?
          this.openInfoModal({
            titles: [FORGOT_PASSWORD_MODAL_TITLE, `${FORGOT_PASSWORD_MODAL_MSG} ${req.email_address}`],
            btnNames: [null, FORGOT_PASSWORD_MODAL_BTN_NAME]
          }).pipe(map(_ => null)) : of(errorMsg)),
        tap((errorMsg: string | null) => !errorMsg && this.router.navigateByUrl(LOGIN_URL)),
        map((errorMsg: string | null) => errorMsg ?
          { type: AuthActions.ACTION_TYPES.REMIND_PASSWORD_FAILURE } : { type: AuthActions.ACTION_TYPES.REMIND_PASSWORD_SUCCESS })
      ))
  ));

  reset$ = createEffect((): any => this.actions$.pipe(
    ofType(AuthActions.ACTION_TYPES.RESET_PASSWORD),
    mergeMap((req: IPasswordResetReq) => this.authService.resetPassword(req).pipe(
      catchError((err: HttpErrorResponse) => of(getHttpResponseErrorMsg(err))),
      switchMap((errorMsg: string | null) => errorMsg ?
        of(errorMsg) : this.openInfoModal({
          titles: [RESET_PASSWORD_MODAL_TITLE, RESET_PASSWORD_SUCCESS_MSG],
          btnNames: [null, 'OK']
        }).pipe(map(_ => null))),
      tap(_ => this.router.navigateByUrl(LOGIN_URL)),
      map((errorMsg: string | null) => errorMsg ?
        AuthActions.resetPasswordFailureAction({ result: null, callState: { errorMsg } }) :
          AuthActions.resetPasswordSuccessAction({ result: null, callState: LoadingState.LOADED }))
    ))
  ));

  checkIfEmailAddressUsed$ = createEffect((): any => this.actions$.pipe(
    ofType(AuthActions.ACTION_TYPES.CHECK_IF_EMAIL_ADDRESS_IN_USE),
    mergeMap((req: ICheckIfEmailAddressInUseReq) => this.authService.validateEmailAddress(req).pipe(
      effectsResponseHandler,
      showResultStateMsgOperator({ service: this.toasterService }),
      map((payload: ResultState<ICheckIfEmailAddressInUseRes | null>) => payload.result ?
        AuthActions.checkIfEmailAddressInUseSuccessAction(payload) :
          AuthActions.checkIfEmailAddressInUseFailureAction(payload as ResultState<null>))
    ))
  ));

  validateResetToken$ = createEffect((): any => this.actions$.pipe(
    ofType(AuthActions.ACTION_TYPES.VALIDATE_RESET_TOKEN),
    mergeMap((req: IValidateResetTokenReq) => this.authService.validateResetToken(req).pipe(
      effectsResponseHandler,
      showResultStateMsgOperator({ service: this.toasterService }),
      map((payload: ResultState<IValidateResetTokenRes | null>) => {
        if (!payload.result) {
          this.router.navigateByUrl(BASE_URL);
          return AuthActions.validateResetTokenFailureAction(payload as ResultState<null>);
        }
        if (!payload.result.valid) {
          this.toasterService.pop(RESET_TOKEN_INVALID_MSG, ToastTypes.error);
          this.router.navigateByUrl(BASE_URL);
          return AuthActions.validateResetTokenFailureAction({ result: null, callState: { errorMsg: RESET_TOKEN_INVALID_MSG } });
        }
        return AuthActions.validateResetTokenSuccessAction(payload);
      })
    ))
  ));

  private openInfoModal(data: IInfoModalData): Observable<any> {
    return this.dialog.open(
      InfoModalComponent,
      { width: DIALOG_SIZES.MD, data }
    ).afterClosed();
  }

}
