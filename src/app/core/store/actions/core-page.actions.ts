
import { createAction, props } from '@ngrx/store';
import { ResultState } from '@app/shared/constants';
import { ICurrency, IRole } from '@app/interfaces';

export enum ACTION_TYPES {
  SIDEBAR_SWITCH = '[CORE PAGE] Switch Sidebar',

  GET_ROLES = '[CORE PAGE] Get Roles',
  GET_ROLES_SUCCESS = '[CORE PAGE] Get Roles Success',
  GET_ROLES_FAILURE = '[CORE PAGE] Get Roles Failure',

  GET_CURRENCIES = '[CORE PAGE] Get Currencies',
  GET_CURRENCIES_SUCCESS = '[CORE PAGE] Get Currencies Success',
  GET_CURRENCIES_FAILURE = '[CORE PAGE] Get Currencies Failure'
}

export const switchSidebarAction = createAction(ACTION_TYPES.SIDEBAR_SWITCH);

export const getRolesAction = createAction(ACTION_TYPES.GET_ROLES);
export const getRolesSuccessAction = createAction(ACTION_TYPES.GET_ROLES_SUCCESS, props<ResultState<IRole[]>>());
export const getRolesFailureAction = createAction(ACTION_TYPES.GET_ROLES_FAILURE);

export const getCurrenciesAction = createAction(ACTION_TYPES.GET_CURRENCIES);
export const getCurrenciesSuccessAction = createAction(ACTION_TYPES.GET_CURRENCIES_SUCCESS, props<ResultState<ICurrency[]>>());
export const getCurrenciesFailureAction = createAction(ACTION_TYPES.GET_CURRENCIES_FAILURE);
