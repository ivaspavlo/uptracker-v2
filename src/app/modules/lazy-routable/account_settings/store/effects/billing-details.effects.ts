
import { Injectable } from '@angular/core';
import { Actions, ofType, Effect, createEffect } from '@ngrx/effects';
import { map, switchMap, tap, catchError } from 'rxjs/operators';
import * as BillingDetailsActions from '../actions/billing-details.actions';
import * as AccountSettingsActions from '../../store/actions/account-settings.actions';
import { ToasterService, IPaymentMethodReq } from '@app/core/services';
import { ResultState, ToastTypes } from '@app/shared/constants';

import { BillingService } from '../../services/billing.service';
import { effectsResponseHandler, showResultStateErrorOperator, showResultStateMsgOperator, get } from '@app/shared/helpers';
import { IBillingHistoryResponce } from '../../interfaces';
import { IBillingCard, IPaymentRes, IPaymentMethod } from '@app/interfaces';
import { PaymentCardService } from '@app/core/services';
import { CARD_REMOVED, CARD_UPDATED, BILLING_CARD_SWITCHED_TO_ACTIVE, BILLING_EMAIL_UPDATED } from '../../constants/messages.constant';
import { of, throwError, Observable } from 'rxjs';
import { SET_PAYMENT_METHOD_SUCCESS_MSG, SET_PAYMENT_METHOD_FAILURE_MSG } from '@app/core/constants';
import { PaymentMethodReq } from '@app/shared/models';


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
    switchMap((req: IPaymentMethodReq) => {
      if (!req) { return throwError(null); }
      return req.stripe_error ? of(req) : paymentCardService.setPaymentMethod(req);
    })
  );
};

@Injectable()
export class BillingDetailsEffects {

  constructor(
    private actions$: Actions,
    private toasterService: ToasterService,
    private billingService: BillingService,
    private paymentCardService: PaymentCardService
  ) { }


  @Effect()
  public billingHistory$ = this.actions$.pipe(
    ofType(BillingDetailsActions.BILLING_DETAILS_ACTION_TYPES.BILLING_DETAILS_HISTORY),
    switchMap((data: any) => {
      return this.billingService.getHistory(data['page'])
        .pipe(
          effectsResponseHandler,
          showResultStateErrorOperator(this.toasterService),
          map((payload: ResultState<IBillingHistoryResponce>) =>
            BillingDetailsActions.successHistoryAction(payload))
        );
    })
  );

  @Effect()
  public deleteBillingCard$ = this.actions$.pipe(
    ofType(BillingDetailsActions.BILLING_DETAILS_ACTION_TYPES.BILLING_DETAILS_DELETE_CARD),
    switchMap((data: any) => {
      return this.billingService.deletePaymentMethod(data['id'])
        .pipe(
          effectsResponseHandler,
          showResultStateErrorOperator(this.toasterService),
          map((_) => AccountSettingsActions.infoAction()),
          tap((_) => this.toasterService.pop(CARD_REMOVED, ToastTypes.success))
        );
    })
  );

  @Effect()
  public updateBillingEmail$ = this.actions$.pipe(
    ofType(BillingDetailsActions.BILLING_DETAILS_ACTION_TYPES.UPDATE_BILLING_EMAIL),
    switchMap((data: any) => {
      return this.billingService.updateBillingEmail(data['email'])
        .pipe(
          effectsResponseHandler,
          showResultStateErrorOperator(this.toasterService),
          map((_) => AccountSettingsActions.infoAction()),
          tap((_) => this.toasterService.pop(BILLING_EMAIL_UPDATED, ToastTypes.success))
        );
    })
  );

  @Effect()
  public setCardToActive$ = this.actions$.pipe(
    ofType(BillingDetailsActions.BILLING_DETAILS_ACTION_TYPES.SET_CARD_TO_ACTIVE),
    switchMap((card: IBillingCard) => {
      return this.billingService.setPaymentMethodToActive(card.id)
        .pipe(
          effectsResponseHandler,
          showResultStateErrorOperator(this.toasterService),
          map((_) => AccountSettingsActions.infoAction()),
          tap((_) => this.toasterService.pop(BILLING_CARD_SWITCHED_TO_ACTIVE, ToastTypes.success))
        );
    }));

  public addBillingCard$ = createEffect((): any => this.actions$.pipe(
    ofType(BillingDetailsActions.BILLING_DETAILS_ACTION_TYPES.BILLING_DETAILS_ADD_CARD),
    createPaymentMethodOperator(this.paymentCardService),
    setPaymentMethodOperator(this.paymentCardService),
    effectsResponseHandler,
    showResultStateMsgOperator({ service: this.toasterService, error: SET_PAYMENT_METHOD_FAILURE_MSG }),
    tap((payload: ResultState<IPaymentRes | null>) => {
      if (!get(payload, 'result.stripe_error') && !get(payload, 'callState.errorMsg')) { this.toasterService.pop(SET_PAYMENT_METHOD_SUCCESS_MSG, ToastTypes.success); }
    }),
    map((payload: ResultState<IPaymentRes | null>) => {
      return (get(payload, 'result.stripe_error') || get(payload, 'callState.errorMsg')) ?
        BillingDetailsActions.addBillingCardsErrorAction(payload) :
        BillingDetailsActions.addBillingCardsSuccessAction(payload);
    })
  ));

  @Effect()
  public editBillingCard$ = this.actions$.pipe(
    ofType(BillingDetailsActions.BILLING_DETAILS_ACTION_TYPES.BILLING_DETAILS_EDIT_CARD),
    switchMap((card: IBillingCard) => {
      return this.billingService.updatePaymentMethod(this.getUpdatePaymentMethodRequest(card), card.id)
        .pipe(
          effectsResponseHandler,
          showResultStateMsgOperator({ service: this.toasterService, success: CARD_UPDATED, error: SET_PAYMENT_METHOD_FAILURE_MSG }),
          map((_) => {
            console.log(_);
            return BillingDetailsActions.editBillingCardActionSuccess()
          } ),
        );
    }));

  private getUpdatePaymentMethodRequest(card: IBillingCard): IPaymentMethod {
    return {
      card_name: card.card_name,
      billing_details: {
        address: {
          city: card.city,
          line1: card.address,
          line2: card.address,
          country: card.country,
          postal_code: card.postal_code,
          state: card.state,
        },
        name: card.name_on_card
      }
    };
  }

}
