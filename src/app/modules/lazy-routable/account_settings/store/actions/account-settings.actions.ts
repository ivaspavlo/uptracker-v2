import { createAction, props } from '@ngrx/store';
import { IAccountSettingsForm } from '../../interfaces';
import { ResultState } from '../../interfaces/result-state.interface';

export enum ACTION_TYPES {
  ACCOUNT_SETTINGS_TAB_SELECT = '[ACCOUNT_SETTINGS select current tab]',
  ACCOUNT_SETTINGS_INFO = '[ACCOUNT_SETTINGS info]',
  ACCOUNT_SETTINGS_INFO_UPDATED = '[ACCOUNT_SETTINGS info updated]',
  ACCOUNT_SETTINGS_COMPANY_INFO_UPDATE = '[ACCOUNT_SETTINGS update]'
}

export const selectTabAction = createAction(ACTION_TYPES.ACCOUNT_SETTINGS_TAB_SELECT, props<{ tab: number }>());
export const infoAction = createAction(ACTION_TYPES.ACCOUNT_SETTINGS_INFO);
export const upateAction = createAction(
  ACTION_TYPES.ACCOUNT_SETTINGS_COMPANY_INFO_UPDATE, props<ResultState<IAccountSettingsForm, string>>());

export const successAction = createAction(ACTION_TYPES.ACCOUNT_SETTINGS_INFO_UPDATED, props<any>());
