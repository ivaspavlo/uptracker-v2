
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { map, switchMap, tap, withLatestFrom } from 'rxjs/operators';

import { ILocation, IDeleteLocationReq, IDeleteLocationRes, IImageResultRes, ILocationReq } from '@app/interfaces';
import { LocationService, ToasterService } from '@app/core/services';
import { LOCATION_CREATED_SUCCESS_MSG, LOCATION_DELETED_SUCCESS_MSG, LOCATION_EDITED_SUCCESS_MSG } from '@app/core/constants';
import { effectsResponseHandler, showResultStateMsgOperator, showResultStateErrorOperator } from '@app/shared/helpers';
import { ResultState } from '@app/shared/constants';

import { selectLocationsState } from '../selectors/locations.selector';
import { ILocationsState } from '../reducers/locations.reducer';
import * as LocationsActions from '../actions/locations.actions';


const updateCurrentLocationOperator = (store: Store, req: IDeleteLocationReq) => (source: Observable<ResultState<IDeleteLocationRes | null>>) => {
  return source.pipe(
    withLatestFrom(store.select(selectLocationsState)),
    tap(([ effectsResponse, state ]: [ResultState<IDeleteLocationRes | null>, ILocationsState]) => {
      if (!effectsResponse.result) { return; }
      const deletedLocationId = req.location_id;
      const currentLocationId = state.current_location;
      if (deletedLocationId === currentLocationId) {
        const [location] = state.locations.filter(l => l.id !== deletedLocationId);
        store.dispatch(LocationsActions.changeCurrentLocationAction({ current_location: location.id }));
      }
    }),
    map(([ effectsResponse ]: [ResultState<IDeleteLocationRes | null>, ILocationsState]) => effectsResponse)
  );
};

@Injectable()
export class LocationsEffects {

  constructor(
    private actions$: Actions,
    private locationService: LocationService,
    private toasterService: ToasterService,
    private store: Store
  ) { }

  getLocations$ = createEffect((): any => this.actions$.pipe(
    ofType(LocationsActions.ACTION_TYPES.GET_LOCATIONS),
    switchMap(_ => this.locationService.getLocations()
      .pipe(
        effectsResponseHandler,
        showResultStateMsgOperator({ service: this.toasterService }),
        map((payload: ResultState<ILocation[] | null>) => {
          return payload.result ?
            LocationsActions.getLocationsSuccessAction(payload) :
            LocationsActions.getLocationsFailureAction();
        })
      ))
  ));

  deleteLocation$ = createEffect((): any => this.actions$.pipe(
    ofType(LocationsActions.ACTION_TYPES.DELETE_LOCATION),
    switchMap((req: IDeleteLocationReq) => this.locationService.deleteLocation(req)
      .pipe(
        effectsResponseHandler,
        updateCurrentLocationOperator(this.store, req),
        showResultStateMsgOperator({ service: this.toasterService, success: LOCATION_DELETED_SUCCESS_MSG }),
        map((payload: ResultState<IDeleteLocationRes | null>) => {
          return payload.result ?
            LocationsActions.deleteLocationSuccessAction({ ...payload, result: req.location_id }) :
            LocationsActions.deleteLocationFailureAction(payload as ResultState<null>);
        })
    ))
  ));

  createLocation$ = createEffect((): any => this.actions$.pipe(
    ofType(LocationsActions.ACTION_TYPES.CREATE_LOCATION),
    switchMap((req: ILocationReq) => this.locationService.createLocation(req)
      .pipe(
        effectsResponseHandler,
        showResultStateMsgOperator({ service: this.toasterService, success: LOCATION_CREATED_SUCCESS_MSG }),
        map((payload: ResultState<ILocation | null>) => {
          return payload.result ?
            LocationsActions.createLocationSuccessAction(payload) :
            LocationsActions.createLocationFailureAction(payload as ResultState<null>);
        })
    ))
  ));

  editLocation$ = createEffect((): any => this.actions$.pipe(
    ofType(LocationsActions.ACTION_TYPES.EDIT_LOCATION),
    switchMap((req: ILocationReq) => this.locationService.editLocation(req)
      .pipe(
        effectsResponseHandler,
        showResultStateMsgOperator({ service: this.toasterService, success: LOCATION_EDITED_SUCCESS_MSG }),
        map((payload: ResultState<ILocation | null>) => {
          return payload.result ?
            LocationsActions.editLocationSuccessAction(payload) :
            LocationsActions.editLocationFailureAction(payload as ResultState<null>);
        })
    ))
  ));

  addLocationImg$ = createEffect((): any => this.actions$.pipe(
    ofType(LocationsActions.ACTION_TYPES.ADD_LOCATION_IMAGE),
    switchMap((req: { data: FormData }) => this.locationService.uploadLocationImage(req)
      .pipe(
        effectsResponseHandler,
        showResultStateErrorOperator(this.toasterService),
        map((payload: ResultState<IImageResultRes | null>) => {
          return payload.result ?
            LocationsActions.addLocationImgSuccessAction(payload) :
            LocationsActions.addLocationImgFailureAction(payload as ResultState<null>);
        })
      ))
  ));

}
