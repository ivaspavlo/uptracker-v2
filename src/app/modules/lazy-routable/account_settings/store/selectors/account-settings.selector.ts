import { IAccountSettingsState } from '@app/modules/lazy-routable/account_settings/interfaces/account-settings-state.interface';
import { createSelector, createFeatureSelector } from '@ngrx/store';
import {  ACTIVE_TAB, FORM_DATA, IS_LOADING, PAYMENT_METODS, BILLING_EMAIL } from '@app/modules/lazy-routable/account_settings/constants/keys';


export const selectAccountSettingsState = createFeatureSelector<IAccountSettingsState>('accountSettings');


export const selectAccountSettingsTab = createSelector(
  selectAccountSettingsState,
  (state: IAccountSettingsState) => state[ACTIVE_TAB]
);

export const selectAccountSettingsFormData = createSelector(
  selectAccountSettingsState,
  (state: IAccountSettingsState) => state[FORM_DATA]
);

export const selectPaymentMetods = createSelector(
  selectAccountSettingsState,
  (state: IAccountSettingsState) => state[PAYMENT_METODS]
);

export const selectbillingEmail = createSelector(
  selectAccountSettingsState,
  (state: IAccountSettingsState) => state[BILLING_EMAIL]
);

export const selecFormLoading = createSelector(
  selectAccountSettingsState,
  (state: IAccountSettingsState) => state[IS_LOADING]
);
