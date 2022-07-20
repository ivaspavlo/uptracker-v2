
import { Action, createReducer, on } from '@ngrx/store';
import { ResultState, LoadingState, CallState } from '@app/shared/constants';
import { ILocation, IImageResultRes } from '@app/interfaces';

import * as LocationsActions from '@app/core/store/actions/locations.actions';


export interface ILocationForm {
  location_name: string;
  id: string;
  img: string;
  address: string;
  location_type: string;
  phone_number: string;
  street_1: string;
  street_2: string;
  suite_number: string;
  city: string;
  postal_code: string;
  state: string;
  country: string;
  primary_tax: number;
  secondary_tax: number;
  currency: string;
}

export interface ILocationsState {
  locations: ILocation[];
  current_location: string;
  uploaded_location_img: string;
  callState: CallState;
}

const initialState: ILocationsState = {
  locations: [],
  current_location: null,
  uploaded_location_img: null,
  callState: LoadingState.INIT
};

const locationsReducer = createReducer<ILocationsState, Action>(
  initialState,

  on(LocationsActions.getLocationsSuccessAction, (state: ILocationsState, { result }: ResultState<ILocation[]>) => ({ ...state, locations: result })),

  on(LocationsActions.changeCurrentLocationAction, (state: ILocationsState, { current_location }: { current_location: string; }) => ({ ...state, current_location: current_location || null })),

  on(LocationsActions.createLocationAction, (state: ILocationsState) => ({ ...state, callState: LoadingState.LOADING })),
  on(LocationsActions.createLocationSuccessAction, (state: ILocationsState, { result, callState }: ResultState<ILocation>) => ({ ...state, locations: [ ...state.locations, result ], callState })),
  on(LocationsActions.createLocationFailureAction, (state: ILocationsState, { callState }: ResultState<null>) => ({ ...state, callState })),

  on(LocationsActions.editLocationAction, (state: ILocationsState) => ({ ...state, callState: LoadingState.LOADING })),
  on(LocationsActions.editLocationSuccessAction, (state: ILocationsState, { result, callState }: ResultState<ILocation>) => ({ ...state, callState, locations: state.locations.map(l => l.id === result.id ? result : l)})),
  on(LocationsActions.editLocationFailureAction, (state: ILocationsState, { callState }: ResultState<null>) => ({ ...state, callState })),

  on(LocationsActions.deleteLocationAction, (state: ILocationsState) => ({ ...state, callState: LoadingState.LOADING })),
  on(LocationsActions.deleteLocationSuccessAction, (state: ILocationsState, { result, callState }: ResultState<string>) => ({ ...state, locations: state.locations.filter(l => l.id !== result), callState })),
  on(LocationsActions.deleteLocationFailureAction, (state: ILocationsState, { callState }: ResultState<null>) => ({ ...state, callState })),

  on(LocationsActions.addLocationImgAction, (state: ILocationsState) => ({ ...state, callState: LoadingState.LOADING })),
  on(LocationsActions.addLocationImgSuccessAction, (state: ILocationsState, { result, callState }: ResultState<IImageResultRes>) => ({ ...state, uploaded_location_img: result.image, callState })),
  on(LocationsActions.addLocationImgFailureAction, (state: ILocationsState, { callState }: ResultState<null>) => ({ ...state, callState })),
);

export default function(state: ILocationsState = initialState, action: Action) {
  return locationsReducer(state, action);
}
