
import { createSelector } from '@ngrx/store';
import { ICoreModuleState } from '@app/core/store/reducers';
import { LoadingState } from '@app/shared/constants';
import { IOnboardingState } from '../reducers/onboarding.reducer';

export const selectOnboardingState = (state: ICoreModuleState): IOnboardingState => state.onboarding;

export const selectOnboardingLoading = createSelector(
  selectOnboardingState,
  (state: IOnboardingState) => state.callState === LoadingState.LOADING
);

export const selectOnboardingPromo = createSelector(
  selectOnboardingState,
  (state: IOnboardingState) => state.promo
);

export const selectOnboardedLocations = createSelector(
  selectOnboardingState,
  (state: IOnboardingState) => state.onboarded_locations
);

export const selectIsSubscribedFlag = createSelector(
  selectOnboardingState,
  (state: IOnboardingState) => state.is_subscribed
);

export const selectInvitedTeam = createSelector(
  selectOnboardingState,
  (state: IOnboardingState) => state.invited_team
);
