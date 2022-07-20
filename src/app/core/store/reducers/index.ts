
import { InjectionToken } from '@angular/core';
import { ActionReducerMap, MetaReducer, ActionReducer } from '@ngrx/store';

import UserState, { IUserState } from './user.reducer';
import CorePageState, { ICorePageState } from './core-page.reducer';
import AccountState, { IAccountState } from './account.reducer';
import LocationsState, { ILocationsState } from './locations.reducer';

import * as AuthActions from '../actions/auth.actions';

export interface ICoreModuleState {
  user: IUserState;
  account: IAccountState;
  locations: ILocationsState;
  corePage: ICorePageState;
  [key: string]: any; // For feature stores
}

export const coreModuleState: ActionReducerMap<ICoreModuleState> = {
  user: UserState,
  account: AccountState,
  locations: LocationsState,
  corePage: CorePageState
};

export function resetState(
  reducer: ActionReducer<ICoreModuleState>
): ActionReducer<ICoreModuleState> {
  return (state, action) => {
    if (action.type === AuthActions.ACTION_TYPES.LOGOUT_SUCCESS) { state = undefined; }
    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<any>[] = [resetState];

export const coreModuleStateToken = new InjectionToken<ActionReducerMap<ICoreModuleState>>('CORE_MODULE_STATE');
