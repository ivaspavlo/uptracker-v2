
import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';

import { ToasterService, LocationService, AccountService, SubscriptionService } from '@app/core/services';
import { effectsResponseHandler, showResultStateMsgOperator, get } from '@app/shared/helpers';
import { ResultState } from '@app/shared/constants';
import { ILocation, IInvitedUser, ICreateSubscriptionReq, IInviteUserReq } from '@app/interfaces';

import { LOCATION_UPDATED_SUCCESS_MSG, LOCATION_SAVED_SUCCESS_MSG, TEAM_INVITED_SUCCESS_MSG } from '../../constants/messages';
import { OnboardingService, IApplyPromoRes, ILocationUpdateReq } from '../../services/onboarding.service';

import * as onboardingActions from '../actions/onboarding.actions';

@Injectable()
export class OnboardingEffects {

  constructor(
    private actions$: Actions,
    private toasterService: ToasterService,
    private locationService: LocationService,
    private onboardingService: OnboardingService,
    private accountService: AccountService,
    private subscriptionService: SubscriptionService
  ) { }

  applyPromoCode$ = createEffect((): any => this.actions$.pipe(
    ofType(onboardingActions.ACTION_TYPES.APPLY_PROMO_CODE),
    switchMap((req: { data: string; }) => this.onboardingService.applyPromoCode(req)
      .pipe(
        effectsResponseHandler,
        showResultStateMsgOperator({ service: this.toasterService }),
        map((payload: ResultState<IApplyPromoRes | null>) => {
          return payload.result ?
            onboardingActions.applyPromoCodeSuccessAction(payload) :
            onboardingActions.applyPromoCodeFailureAction(payload as ResultState<null>);
        })
    ))
  ));

  createLocation$ = createEffect((): any => this.actions$.pipe(
    ofType(onboardingActions.ACTION_TYPES.CREATE_LOCATION),
    switchMap(({ idx, location }: ILocationUpdateReq) => this.locationService.createLocation(location)
      .pipe(
        effectsResponseHandler,
        showResultStateMsgOperator({ service: this.toasterService, success: LOCATION_SAVED_SUCCESS_MSG }),
        map((payload: ResultState<ILocation | null>) => {
          return payload.result ?
            onboardingActions.createLocationSuccessAction({ ...payload, result: { idx, location: payload.result } }) :
            onboardingActions.createLocationFailureAction(payload as ResultState<null>);
        })
    ))
  ));

  editLocation$ = createEffect((): any => this.actions$.pipe(
    ofType(onboardingActions.ACTION_TYPES.EDIT_LOCATION),
    switchMap(({ idx, location }: ILocationUpdateReq) => this.locationService.editLocation(location)
      .pipe(
        effectsResponseHandler,
        showResultStateMsgOperator({ service: this.toasterService, success: LOCATION_UPDATED_SUCCESS_MSG }),
        map((payload: ResultState<ILocation | null>) => {
          return payload.result ?
            onboardingActions.editLocationSuccessAction({ ...payload, result: { idx, location: payload.result } }) :
            onboardingActions.editLocationFailureAction(payload as ResultState<null>);
        })
    ))
  ));

  createSubscription$ = createEffect((): any => this.actions$.pipe(
    ofType(onboardingActions.ACTION_TYPES.CREATE_SUBSCRIPTION),
    switchMap((req: ICreateSubscriptionReq) => this.subscriptionService.createSubscription(req)
      .pipe(
        effectsResponseHandler,
        showResultStateMsgOperator({ service: this.toasterService }),
        map((payload: ResultState<any | null>) => {
          return payload.result ?
            onboardingActions.createSubscriptionSuccessAction({ ...payload, result: { is_subscribed: true } }) :
            onboardingActions.createSubscriptionFailureAction(payload as ResultState<null>);
        })
    ))
  ));

  inviteTeam$ = createEffect((): any => this.actions$.pipe(
    ofType(onboardingActions.ACTION_TYPES.INVITE_TEAM),
    switchMap((req: IInviteUserReq) => this.accountService.inviteUser(req)
      .pipe(
        effectsResponseHandler,
        showResultStateMsgOperator({ service: this.toasterService, success: TEAM_INVITED_SUCCESS_MSG }),
        map((payload: ResultState<IInvitedUser[] | null>) => {
          return payload.result ?
            onboardingActions.inviteTeamSuccessAction(payload) :
            onboardingActions.inviteTeamFailureAction(payload as ResultState<null>);
        })
      ))
  ));

}
