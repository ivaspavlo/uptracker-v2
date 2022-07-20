
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { Observable, of, throwError } from 'rxjs';
import { map, switchMap, withLatestFrom, catchError, tap } from 'rxjs/operators';

import { IAccountState, IDeleteInviteUserReq, IInvitedUser, IAccountUser, IAccountData, IAccountPlan, IBillingCard, IGetAccountUsersReq, IUpdateAccountUserReq, IArchiveAccountUserReq, IGetArchivedUsersReq, IGetInvitedUsersReq, IInviteUserReq, IEditInviteUserReq, IPaymentMethodReq, IPaymentMethodRes, IStripeFailureRes, IPaymentMethod } from '@app/interfaces';
import { ToasterService, AccountService, PaymentCardService } from '@app/core/services';
import { effectsResponseHandler, showResultStateMsgOperator, get } from '@app/shared/helpers';
import { ResultState, ToastTypes } from '@app/shared/constants';
import { PaymentMethodReq } from '@app/shared/models';

import { selectInvitedUsers, selectAccountUsers, selectAccountState } from '../selectors';
import { USER_INVITE_SUCCESS_MSG, USER_INVITE_EDITED_SUCCESS_MSG, USER_INVITE_DELETED_SUCCESS_MSG, USER_REACTIVATE_SUCCESS_MSG, USER_UPDATED_SUCCESS_MSG, USER_ARCHIVED_SUCCESS_MSG, SET_PAYMENT_METHOD_FAILURE_MSG, SET_PAYMENT_METHOD_SUCCESS_MSG } from '../../constants/messages';

import * as AccountActions from '../actions/account.actions';


const createPaymentMethodOperator = (paymentCardService: PaymentCardService) => (source: Observable<IBillingCard>) => {
  return source.pipe(
    switchMap((req: IBillingCard) => paymentCardService.getToken(req).pipe(
      map((stripe_res: any) => new PaymentMethodReq({ ...req, stripe_res })),
      catchError(_ => of(null))
    ))
  );
};

const setPaymentMethodOperator = (paymentCardService: PaymentCardService) => (source: Observable<IPaymentMethodReq>) => {
  return source.pipe(
    map((req: IPaymentMethodReq) => {
      if (!req) { return throwError(null); }
      return req.stripe_error ? of(req) : paymentCardService.setPaymentMethod(req);
    }),
    switchMap((req: Observable<IPaymentMethodReq>) => req.pipe(effectsResponseHandler))
  );
};

@Injectable()
export class AccountEffects {

  constructor(
    private store: Store,
    private actions$: Actions,
    private accountService: AccountService,
    private toasterService: ToasterService,
    private paymentCardService: PaymentCardService
  ) { }

  // CORE ACCOUNT

  getAccountProfileData$ = createEffect((): any => this.actions$.pipe(
    ofType(AccountActions.ACTION_TYPES.GET_ACCOUNT_PROFILE_DATA),
    switchMap(_ => this.accountService.getAccount()
      .pipe(
        effectsResponseHandler,
        showResultStateMsgOperator({ service: this.toasterService }),
        map((payload: ResultState<null | IAccountData>) => {
          return payload.result ?
            AccountActions.getAccountProfileDataSuccessAction(payload) :
            AccountActions.getAccountProfileDataFailureAction(payload as ResultState<null>);
        })
      ))
  ));

  getAccountPlans$ = createEffect((): any => this.actions$.pipe(
    ofType(AccountActions.ACTION_TYPES.GET_ACCOUNT_PLANS),
    switchMap(_ => this.accountService.getPlans()
      .pipe(
        effectsResponseHandler,
        showResultStateMsgOperator({ service: this.toasterService }),
        map((payload: ResultState<IAccountPlan[] | null>) => {
          return payload.result ?
            AccountActions.getAccountPlansSuccessAction(payload) :
            AccountActions.getAccountPlansFailureAction(payload as ResultState<null>);
        })
    ))
  ));

  getCurrentAccountPlan$ = createEffect((): any => this.actions$.pipe(
    ofType(AccountActions.ACTION_TYPES.GET_CURRENT_ACCOUNT_PLAN),
    switchMap(_ => this.accountService.getCurrentPlan()
      .pipe(
        effectsResponseHandler,
        showResultStateMsgOperator({ service: this.toasterService }),
        map((payload: ResultState<IAccountPlan[] | null>) => {
          return payload.result ?
            AccountActions.getСurrentAccountPlanSuccessAction(payload) :
            AccountActions.getСurrentAccountPlanFailureAction(payload as ResultState<null>);
        })
    ))
  ));

  setPaymentMethod$ = createEffect((): any => this.actions$.pipe(
    ofType(AccountActions.ACTION_TYPES.SET_ACCOUNT_PAYMENT_METHOD),
    createPaymentMethodOperator(this.paymentCardService),
    setPaymentMethodOperator(this.paymentCardService),
    showResultStateMsgOperator({ service: this.toasterService, error: SET_PAYMENT_METHOD_FAILURE_MSG }),
    tap((payload: ResultState<IPaymentMethodRes | IStripeFailureRes | null | null>) => { if (payload.result && !get(payload, 'result.stripe_error')) { this.toasterService.pop(SET_PAYMENT_METHOD_SUCCESS_MSG, ToastTypes.success); } }),
    map((payload: ResultState<IPaymentMethodRes | IStripeFailureRes | null>) => {
      return !payload.result ?
        AccountActions.setAccountPaymentMethodFailureAction(payload as ResultState<null>) :
        AccountActions.setAccountPaymentMethodSuccessAction({
          ...payload,
          result: {
            payment_methods: get(payload, 'result.payment_methods') || [],
            stripe_error: get(payload, 'result.stripe_error') || null
          }
        } as ResultState<{ payment_methods: IPaymentMethod[]; stripe_error: IStripeFailureRes; }>);
    })
  ));

  // ACCOUNT USERS

  getAccountUsers$ = createEffect((): any => this.actions$.pipe(
    ofType(AccountActions.ACTION_TYPES.GET_ACCOUNT_USERS),
    switchMap((req: IGetAccountUsersReq) => this.accountService.getAccountUsers(req)
      .pipe(
        effectsResponseHandler,
        showResultStateMsgOperator({ service: this.toasterService }),
        map((payload: ResultState<null | IAccountUser[]>) => {
          return payload.result ?
            AccountActions.getAccountUsersSuccessAction(payload) :
            AccountActions.getAccountUsersFailureAction(payload as ResultState<null>);
        })
      ))
  ));

  updateAccountUser$ = createEffect((): any => this.actions$.pipe(
    ofType(AccountActions.ACTION_TYPES.UPDATE_ACCOUNT_USER),
    switchMap((req: IUpdateAccountUserReq) => this.accountService.updateAccountUser(req)
      .pipe(
        effectsResponseHandler,
        showResultStateMsgOperator({ service: this.toasterService, success: USER_UPDATED_SUCCESS_MSG }),
        withLatestFrom(this.store.select(selectAccountUsers)),
        map(([payload, storeAccountUsers]: [ResultState<IAccountUser | null>, IAccountUser[]]) => {
          if (!payload.result) { return AccountActions.updateAccountUserFailureAction(payload as ResultState<null>); }
          return AccountActions.updateAccountUserSuccessAction({ ...payload, result: storeAccountUsers.map(user => user.id === payload.result.id ? payload.result : user) });
        })
      ))
  ));

  archiveAccountUser$ = createEffect((): any => this.actions$.pipe(
    ofType(AccountActions.ACTION_TYPES.ARCHIVE_ACCOUNT_USER),
    switchMap((req: IArchiveAccountUserReq) => this.accountService.archiveAccountUser(req)
      .pipe(
        effectsResponseHandler,
        showResultStateMsgOperator({ service: this.toasterService, success: USER_ARCHIVED_SUCCESS_MSG }),
        withLatestFrom(this.store.select(selectAccountState)),
        map(([payload, accountState]: [ResultState<IAccountUser | null>, IAccountState]) => {
          if (!payload.result) { return AccountActions.archiveAccountUserFailureAction(payload as ResultState<null>); }
          return AccountActions.archiveAccountUserSuccessAction({
            ...payload,
            result: {
              account_users: accountState.account_users.filter(user => user.id !== payload.result.id),
              archived_users: [ ...accountState.archived_users, payload.result ]
            }
          });
        })
      ))
  ));

  getArchivedUsers$ = createEffect((): any => this.actions$.pipe(
    ofType(AccountActions.ACTION_TYPES.GET_ARCHIVED_USERS),
    switchMap((req: IGetArchivedUsersReq) => this.accountService.getArchivedUsers(req)
      .pipe(
        effectsResponseHandler,
        showResultStateMsgOperator({ service: this.toasterService }),
        map((payload: ResultState<null | IAccountUser[]>) => {
          return payload.result ?
            AccountActions.getArchivedUsersSuccessAction(payload) :
            AccountActions.getArchivedUsersFailureAction(payload as ResultState<null>);
        })
      ))
  ));

  reacitvateAccountUsers$ = createEffect((): any => this.actions$.pipe(
    ofType(AccountActions.ACTION_TYPES.REACTIVATE_ACCOUNT_USER),
    switchMap((req: IUpdateAccountUserReq) => this.accountService.updateAccountUser(req)
      .pipe(
        effectsResponseHandler,
        showResultStateMsgOperator({ service: this.toasterService, success: USER_REACTIVATE_SUCCESS_MSG }),
        withLatestFrom(this.store.select(selectAccountState)),
        map(([payload, accountState]: [ResultState<IAccountUser | null>, IAccountState]) => {
          if (!payload.result) { return AccountActions.reactivateAccountUserFailureAction(payload as ResultState<null>); }
          return AccountActions.reactivateAccountUserSuccessAction({
            ...payload,
            result: {
              account_users: [ ...accountState.account_users, payload.result ],
              archived_users: accountState.archived_users.filter(user => user.id !== payload.result.id)
            }
          });
        })
      ))
  ));

  // INVITE USERS

  getInvitedUsers$ = createEffect((): any => this.actions$.pipe(
    ofType(AccountActions.ACTION_TYPES.GET_INVITED_USERS),
    switchMap((req: IGetInvitedUsersReq) => this.accountService.getInvitedUsers(req)
      .pipe(
        effectsResponseHandler,
        showResultStateMsgOperator({ service: this.toasterService }),
        map((payload: ResultState<null | IInvitedUser[]>) => {
          return payload.result ?
            AccountActions.getInvitedUsersSuccessAction(payload) :
            AccountActions.getInvitedUsersFailureAction(payload as ResultState<null>);
        })
      ))
  ));

  inviteUser$ = createEffect((): any => this.actions$.pipe(
    ofType(AccountActions.ACTION_TYPES.INVITE_USER),
    switchMap((req: IInviteUserReq) => this.accountService.inviteUser(req)
      .pipe(
        effectsResponseHandler,
        showResultStateMsgOperator({ service: this.toasterService, success: USER_INVITE_SUCCESS_MSG }),
        withLatestFrom(this.store.select(selectInvitedUsers)),
        map(([payload, storeInvitedUsers]: [ResultState<IInvitedUser[] | null>, IInvitedUser[]]) => {
          if (!payload.result) { return AccountActions.inviteUserFailureAction(payload as ResultState<null>); }
          return AccountActions.inviteUserSuccessAction({ ...payload, result: [ ...storeInvitedUsers, ...payload.result ] });
        })
      ))
  ));

  editInviteUser$ = createEffect((): any => this.actions$.pipe(
    ofType(AccountActions.ACTION_TYPES.EDIT_INVITE_USER),
    switchMap((req: IEditInviteUserReq) => this.accountService.editInviteUser(req)
      .pipe(
        effectsResponseHandler,
        showResultStateMsgOperator({ service: this.toasterService, success: USER_INVITE_EDITED_SUCCESS_MSG }),
        withLatestFrom(this.store.select(selectInvitedUsers)),
        map(([payload, storeInvitedUsers]: [ResultState<IInvitedUser | null>, IInvitedUser[]]) => {
          if (!payload.result) { return AccountActions.editInviteUserFailureAction(payload as ResultState<null>); }
          return AccountActions.editInviteUserSuccessAction({ ...payload, result: storeInvitedUsers.map(invitedUser => invitedUser.id === payload.result.id ? payload.result : invitedUser) });
        })
      ))
  ));

  deleteInviteUser$ = createEffect((): any => this.actions$.pipe(
    ofType(AccountActions.ACTION_TYPES.DELETE_INVITE_USER),
    switchMap((req: IDeleteInviteUserReq) => this.accountService.deleteInviteUser(req)
      .pipe(
        effectsResponseHandler,
        showResultStateMsgOperator({ service: this.toasterService, success: USER_INVITE_DELETED_SUCCESS_MSG }),
        withLatestFrom(this.store.select(selectInvitedUsers)),
        map(([payload, storeInvitedUsers]: [ResultState<IInvitedUser | null>, IInvitedUser[]]) => {
          if (!payload.result) { return AccountActions.deleteInviteUserFailureAction(payload as ResultState<null>); }
          return AccountActions.deleteInviteUserSuccessAction({ ...payload, result: storeInvitedUsers.filter(invitedUser => invitedUser.invite_token !== req.invite_token) });
        })
      ))
  ));

}
