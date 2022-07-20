
import { createSelector } from '@ngrx/store';

import { IAccountData, ILocation, IUserProfile } from '@app/interfaces';
import { LoadingState } from '@app/shared/constants';
import { get } from '@app/shared/helpers';
import { selectAccountProfileData, selectCurrentAccountPlan } from '@app/core/store/selectors/account.selector';

import { selectUserProfile } from './user.selector';
import { ICoreModuleState } from '../reducers';
import { ILocationsState } from '../reducers/locations.reducer';

export const selectLocationsState = (state: ICoreModuleState) => state.locations;

export const currentLocationSetter = createSelector(
  selectLocationsState,
  selectUserProfile,
  ({ locations }: ILocationsState, userProfile: IUserProfile) => {
    return !!userProfile && locations && locations.length ?
      { current_location: userProfile.default_location_id || locations[0].id } : null;
  }
);

export const selectCurrentLocation = createSelector(
  selectLocationsState,
  (state: ILocationsState) => state.current_location
);

export const selectLocations = createSelector(
  selectLocationsState,
  (state: ILocationsState) => state.locations
);

export const selectLocationsLoading = createSelector(
  selectLocationsState,
  (state: ILocationsState) => state.callState === LoadingState.LOADING
);

export const selectLocationsCallState = createSelector(
  selectLocationsState,
  (state: ILocationsState) => state.callState
);

export const selectLocationCallStateHasError = createSelector(
  selectLocationsState,
  (state: ILocationsState) => ({ hasError: !!get(state, 'callState.errorMsg') })
);

export const selectLocationImg = createSelector(
  selectLocationsState,
  (state: ILocationsState) => state.uploaded_location_img
);

export const selectLocationsCombinedData = createSelector(
  selectLocations,
  selectAccountProfileData,
  selectCurrentAccountPlan,
  (locations: ILocation[], account_profile_data: IAccountData, current_account_plan: any) => ({
    locations,
    current_locations_qty: get(locations, 'length', 0),
    max_locations_qty: get(account_profile_data, 'max_locations', null),
    is_only_one_location: locations && locations.length === 1,
    additional_location_price: get(current_account_plan, 'additional_location_price', null)
  })
);

export const selectIsOnlyOneLocation = createSelector(
  selectLocationsCombinedData,
  ({ locations }) => locations && locations.length === 1
);

export const selectMaxLocationQty = createSelector(
  selectLocationsCombinedData,
  ({ max_locations_qty }) => max_locations_qty
);

export const selectSpecificLocation = createSelector(
  selectLocationsState,
  (state: ILocationsState, { location_id }: { location_id: string; }) => {
    if (state.locations && state.locations.length) {
      return { selected_location: location_id ? state.locations.find(l => l.id === location_id) : null };
    }
  }
);
