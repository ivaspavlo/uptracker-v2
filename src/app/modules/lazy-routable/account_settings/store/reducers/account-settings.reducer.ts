import { Action, createReducer, on } from '@ngrx/store';
import { IAccountSettingsState } from '@app/modules/lazy-routable/account_settings/interfaces';

import * as  AccountSettingsActions from '@app/modules/lazy-routable/account_settings/store/actions/account-settings.actions';
import { ACTIVE_TAB, FORM_DATA, BLANK_STRING, IS_LOADING, PAYMENT_METODS, BILLING_EMAIL } from '@app/modules/lazy-routable/account_settings/constants/keys';

export const initialState: IAccountSettingsState = {
  [ACTIVE_TAB]: 0,
  [FORM_DATA]: {
    id: BLANK_STRING,
    company_name: BLANK_STRING,
    full_address: BLANK_STRING,
    company_email_address: BLANK_STRING,
    street_1: BLANK_STRING,
    street_2: BLANK_STRING,
    suite: BLANK_STRING,
    city: BLANK_STRING,
    postal_code: BLANK_STRING,
    state: BLANK_STRING,
    country: BLANK_STRING
  },
  [BILLING_EMAIL]: '',
  [PAYMENT_METODS]: null,
  [IS_LOADING]: false
}

const accountSettingsReducer = createReducer<IAccountSettingsState, Action>(
  initialState,
  on(AccountSettingsActions.selectTabAction, (state: IAccountSettingsState, res: any) => {
    return { ...state, [ACTIVE_TAB]: res.tab };
  }),
  on(AccountSettingsActions.infoAction, (state: IAccountSettingsState, res: any) => {
    return { ...state, [IS_LOADING]: true };
  }),
  on(AccountSettingsActions.upateAction, (state: IAccountSettingsState, res: any) => {
    return { ...state, [IS_LOADING]: true };
  }),
  on(AccountSettingsActions.successAction, (state: IAccountSettingsState, data: any) => {
    const form = data.result || data;
    return { ...state,
      [FORM_DATA]: form,
      [IS_LOADING]: false,
      [PAYMENT_METODS]:  form.payment_methods,
      [BILLING_EMAIL]: form.billing_email_address };
  }),
);

export function reducer(state: IAccountSettingsState = initialState, action: Action) {
  return accountSettingsReducer(state, action);
}
