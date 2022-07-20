
import { createReducer, on, Action } from '@ngrx/store';
import { CallState, LoadingState, ResultState } from '@app/shared/constants';

import { IInvitedUser, ICreateSubscriptionRes, ILocation } from '@app/interfaces';
import { IApplyPromoRes, ILocationUpdateRes } from '../../services/onboarding.service';

import * as OnboardingActions from '../actions/onboarding.actions';

export interface IOnboardingState {
  promo: IApplyPromoRes;
  onboarded_locations: { idx: number, location: ILocation }[];
  is_subscribed: boolean;
  invited_team: IInvitedUser[];
  callState: CallState;
}

const initialState = {
  promo: null,
  onboarded_locations: [],
  is_subscribed: false,
  invited_team: [],
  callState: LoadingState.INIT
};

const userReducer = createReducer<IOnboardingState, Action>(
  initialState,

  on(OnboardingActions.applyPromoCodeAction, (state: IOnboardingState) => ({ ...state, callState: LoadingState.LOADING })),
  on(OnboardingActions.applyPromoCodeSuccessAction, (state: IOnboardingState, { result, callState }: ResultState<IApplyPromoRes>) => ({ ...state, promo: result, callState })),
  on(OnboardingActions.applyPromoCodeFailureAction, (state: IOnboardingState, { callState }: ResultState<null>) => ({ ...state, callState })),

  on(OnboardingActions.createSubscriptionAction, (state: IOnboardingState) => ({ ...state, callState: LoadingState.LOADING })),
  on(OnboardingActions.createSubscriptionSuccessAction, (state: IOnboardingState, { result, callState }: ResultState<ICreateSubscriptionRes>) => ({ ...state, ...result, callState })),
  on(OnboardingActions.createSubscriptionFailureAction, (state: IOnboardingState, { callState }: ResultState<null>) => ({ ...state, callState })),

  on(OnboardingActions.inviteTeamAction, (state: IOnboardingState) => ({ ...state, callState: LoadingState.LOADING })),
  on(OnboardingActions.inviteTeamSuccessAction, (state: IOnboardingState, { result, callState }: ResultState<IInvitedUser[]>) => ({ ...state, invited_team: result, callState })),
  on(OnboardingActions.inviteTeamFailureAction, (state: IOnboardingState, { callState }: ResultState<null>) => ({ ...state, callState })),

  on(OnboardingActions.createLocationAction, (state: IOnboardingState) => ({ ...state, callState: LoadingState.LOADING })),
  on(OnboardingActions.createLocationSuccessAction, (state: IOnboardingState, { result, callState }: ResultState<ILocationUpdateRes>) => ({ ...state, onboarded_locations: [ ...state.onboarded_locations, result ], callState })),
  on(OnboardingActions.createLocationFailureAction, (state: IOnboardingState, { callState }: ResultState<null>) => ({ ...state, callState })),

  on(OnboardingActions.editLocationAction, (state: IOnboardingState) => ({ ...state, callState: LoadingState.LOADING })),
  on(OnboardingActions.editLocationSuccessAction, (state: IOnboardingState, { result, callState }: ResultState<ILocationUpdateRes>) => ({ ...state, onboarded_locations: state.onboarded_locations.map(l => l.idx === result.idx ? result : l), callState })),
  on(OnboardingActions.editLocationFailureAction, (state: IOnboardingState, { callState }: ResultState<null>) => ({ ...state, callState })),
);

export function reducer(state: IOnboardingState, action: Action) { return userReducer(state, action); }
