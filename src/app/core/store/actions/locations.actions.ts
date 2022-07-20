
import { createAction, props } from '@ngrx/store';
import { ResultState } from '@app/shared/constants';
import { ILocation, IDeleteLocationReq, IImageResultRes, ILocationReq } from '@app/interfaces';

export enum ACTION_TYPES {
  GET_LOCATIONS = '[CORE LOCATIONS] Get Locations',
  GET_LOCATIONS_SUCCESS = '[CORE LOCATIONS] Get Locations Success',
  GET_LOCATIONS_FAILURE = '[CORE LOCATIONS] Get Locations Failure',

  CREATE_LOCATION = '[CORE LOCATIONS] Create Location',
  CREATE_LOCATION_SUCCESS = '[CORE LOCATIONS] Create Location Success',
  CREATE_LOCATION_FAILURE = '[CORE LOCATIONS] Create Location Failure',

  EDIT_LOCATION = '[CORE LOCATIONS] Edit Location',
  EDIT_LOCATION_SUCCESS = '[CORE LOCATIONS] Edit Location Success',
  EDIT_LOCATION_FAILURE = '[CORE LOCATIONS] Edit Location Failure',

  DELETE_LOCATION = '[CORE LOCATIONS] Delete Location',
  DELETE_LOCATION_SUCCESS = '[LOCATIONS] Delete Location Success',
  DELETE_LOCATION_FAILURE = '[LOCATIONS] Delete Location Failure',

  CHANGE_CURRENT_LOCATION = '[CORE LOCATIONS] Change Current Location',
  CHANGE_CURRENT_LOCATION_SUCCESS = '[CORE LOCATIONS] Change Current Location Success',
  CHANGE_CURRENT_LOCATION_FAILURE = '[CORE LOCATIONS] Change Current Location Failure',

  ADD_LOCATION_IMAGE = '[CORE LOCATIONS] Add Location Image',
  ADD_LOCATION_IMAGE_SUCCESS = '[CORE LOCATIONS] Add Location Image Success',
  ADD_LOCATION_IMAGE_FAILURE = '[CORE LOCATIONS] Add Location Image Failure'
}

export const getLocationsAction = createAction(ACTION_TYPES.GET_LOCATIONS);
export const getLocationsSuccessAction = createAction(ACTION_TYPES.GET_LOCATIONS_SUCCESS, props<ResultState<ILocation[]>>());
export const getLocationsFailureAction = createAction(ACTION_TYPES.GET_LOCATIONS_FAILURE);

export const changeCurrentLocationAction = createAction(ACTION_TYPES.CHANGE_CURRENT_LOCATION, props<{ current_location: string }>());
export const changeCurrentLocationSuccessAction = createAction(ACTION_TYPES.CHANGE_CURRENT_LOCATION_SUCCESS);
export const changeCurrentLocationFailureAction = createAction(ACTION_TYPES.CHANGE_CURRENT_LOCATION_FAILURE);

export const createLocationAction = createAction(ACTION_TYPES.CREATE_LOCATION, props<ILocationReq>());
export const createLocationSuccessAction = createAction(ACTION_TYPES.CREATE_LOCATION_SUCCESS, props<ResultState<ILocation>>());
export const createLocationFailureAction = createAction(ACTION_TYPES.CREATE_LOCATION_FAILURE, props<ResultState<null>>());

export const editLocationAction = createAction(ACTION_TYPES.EDIT_LOCATION, props<ILocationReq>());
export const editLocationSuccessAction = createAction(ACTION_TYPES.EDIT_LOCATION_SUCCESS, props<ResultState<ILocation>>());
export const editLocationFailureAction = createAction(ACTION_TYPES.EDIT_LOCATION_FAILURE, props<ResultState<null>>());

export const deleteLocationAction = createAction(ACTION_TYPES.DELETE_LOCATION, props<IDeleteLocationReq>());
export const deleteLocationSuccessAction = createAction(ACTION_TYPES.DELETE_LOCATION_SUCCESS, props<ResultState<string>>());
export const deleteLocationFailureAction = createAction(ACTION_TYPES.DELETE_LOCATION_FAILURE, props<ResultState<null>>());

export const addLocationImgAction = createAction(ACTION_TYPES.ADD_LOCATION_IMAGE, props<{ data: FormData }>());
export const addLocationImgSuccessAction = createAction(ACTION_TYPES.ADD_LOCATION_IMAGE_SUCCESS, props<ResultState<IImageResultRes>>());
export const addLocationImgFailureAction = createAction(ACTION_TYPES.ADD_LOCATION_IMAGE_FAILURE, props<ResultState<null>>());
