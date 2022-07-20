
import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';

import { map, switchMap, tap } from 'rxjs/operators';
import { ToasterService, ICancelAccountReq, AccountService } from '@app/core/services';
import * as SubscriptionPlansActions from './../actions/subscription-plan.actions';
import { SET_SUBSCRIPTION_PLAN_SUCCESS_MSG, SUBSCRIPTION_PLAN_CANCEL_MSG } from '@app/core/constants';

import { SubscriptionService, IUpdateSubscriptionReq, ICreateSubscriptionReq, ICreateSubscriptionRes } from '@app/core/services/subscription.service';
import { effectsResponseHandler, showResultStateErrorOperator, showResultStateMsgOperator } from '@app/shared/helpers';
import { ResultState, ToastTypes } from '@app/shared/constants';
import { IAccountPlan, ISubscription } from '@app/interfaces/common';
import { IApplyPromoRes } from '@app/interfaces';
import { PROMO_CODE_APPLYING_FAILUE } from '../../constants/messages.constant';
import { Router } from '@angular/router';

@Injectable()
export class SubscriptionPlansEffects {

  constructor(
    private actions$: Actions,
    private toasterService: ToasterService,
    private subscriptionService: SubscriptionService,
    private accountService: AccountService,
    private router: Router
  ) { }

  @Effect()
  public getSubscriptionPlans$ = this.actions$.pipe(
    ofType(SubscriptionPlansActions.ACTION_TYPES.SUBSCRUPTION_PLAN_GET_PLANS),
    switchMap(_ => {
      return this.subscriptionService.getPlans()
        .pipe(
          effectsResponseHandler,
          showResultStateErrorOperator(this.toasterService),
          map((payload: ResultState<IAccountPlan[]>) => SubscriptionPlansActions.getSubscriptionPlansSuccess(payload))
        );
    })
  );

  @Effect()
  public getSubscription$ = this.actions$.pipe(
    ofType(SubscriptionPlansActions.ACTION_TYPES.SUBSCRUPTION_PLAN_GET_SUBSCRIPTION),
    switchMap(_ => {
      return this.subscriptionService.getSubscription()
        .pipe(
          effectsResponseHandler,
          showResultStateErrorOperator(this.toasterService),
          map((payload: ResultState<ISubscription>) => SubscriptionPlansActions.getSubscriptionSuccess(payload))
        );
    })
  );

  @Effect()
  public updateSubscription$ = this.actions$.pipe(
    ofType(SubscriptionPlansActions.ACTION_TYPES.SUBSCRUPTION_PLAN_SET_AS_ACTIVE),
    switchMap((subscription: ICreateSubscriptionReq) => {
      return this.subscriptionService.createSubscription(subscription)
        .pipe(
          effectsResponseHandler,
          showResultStateMsgOperator({ service: this.toasterService, success: SET_SUBSCRIPTION_PLAN_SUCCESS_MSG }),
          map((payload: ResultState<ICreateSubscriptionRes>) => {
            this.router.navigateByUrl('/account_settings');
            return SubscriptionPlansActions.setSubscriptionPlanAsActiveSuccess(payload);
          }));
    })
  );

  @Effect()
  public applyPromo$ = this.actions$.pipe(
    ofType(SubscriptionPlansActions.ACTION_TYPES.SUBSCRUPTION_PLAN_SET_PROMO),
    switchMap((req: ICreateSubscriptionReq) => {
      return this.subscriptionService.createSubscription(req)
        .pipe(
          effectsResponseHandler,
          showResultStateMsgOperator({ service: this.toasterService, success: SET_SUBSCRIPTION_PLAN_SUCCESS_MSG }),
          map((payload: ResultState<IApplyPromoRes>) => {
            this.router.navigateByUrl('/account_settings');
            return SubscriptionPlansActions.setSubscriptionPlanPromoSuccess(payload);
          }));
    })
  );

  @Effect()
  public checkPromoCode$ = this.actions$.pipe(
    ofType(SubscriptionPlansActions.ACTION_TYPES.SUBSCRUPTION_PLAN_CHECK_PROMO),
    switchMap((req: ICreateSubscriptionReq) => {
      return this.subscriptionService.checkPromoCode(req.promo_code)
        .pipe(
          effectsResponseHandler,
          map((payload: ResultState<IApplyPromoRes>) => {
            return (payload.result.valid) ?
              SubscriptionPlansActions.checkSubscriptionPlanPromoSuccess(payload) :
              (SubscriptionPlansActions.checkSubscriptionPlanPromoFailure(payload));
          }));
    })
  );

  @Effect()
  public cancelSubscription$ = this.actions$.pipe(
    ofType(SubscriptionPlansActions.ACTION_TYPES.SUBSCRUPTION_PLAN_CANCEL),
    switchMap((req: any) => {
      return this.accountService.cancelAccount(req.id, req.data)
        .pipe(
          effectsResponseHandler,
          showResultStateMsgOperator({ service: this.toasterService, success: SUBSCRIPTION_PLAN_CANCEL_MSG }),
          map((payload: ResultState<any>) => SubscriptionPlansActions.cancelSubscriptionPlanSuccess(payload)));
    })
  );

}
