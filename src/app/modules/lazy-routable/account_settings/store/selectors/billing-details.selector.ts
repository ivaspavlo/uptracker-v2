import { IBillingDetailsState } from '@app/modules/lazy-routable/account_settings/interfaces/billing-details-state.interface';
import { createSelector, createFeatureSelector } from '@ngrx/store'
import { BILLING_CARDS, BILLING_HISTORY, CALL_STATE, BILLING_HISTORY_LOADING_STATE, BILLING_CARDS_LOADING_STATE, BILLING_CARD_FORM_LOADING_STATE, BILLING_CARD_FORM_VISIBLE_STATE, BILLING_CARD_FORM_ERROR } from '@app/modules/lazy-routable/account_settings/constants/keys';

export const selectBillingDetailsState = createFeatureSelector<IBillingDetailsState>('billingDetails');

export const selectBillingDetailsHistory = createSelector(
  selectBillingDetailsState,
  (state: IBillingDetailsState) => state[BILLING_HISTORY]
);

export const selectBillingCards = createSelector(
  selectBillingDetailsState,
  (state: IBillingDetailsState) => state[BILLING_CARDS]
);

export const selecBillingHistoryTableLoading = createSelector(
  selectBillingDetailsState,
  (state: IBillingDetailsState) => state[BILLING_HISTORY_LOADING_STATE]
);

export const selecBillingCardsLoading = createSelector(
  selectBillingDetailsState,
  (state: IBillingDetailsState) => state[BILLING_CARDS_LOADING_STATE]
);

export const selecBillingCardFormLoading = createSelector(
  selectBillingDetailsState,
  (state: IBillingDetailsState) => state[BILLING_CARD_FORM_LOADING_STATE]
);

export const selecBillingCardFormVisible = createSelector(
  selectBillingDetailsState,
  (state: IBillingDetailsState) => state[BILLING_CARD_FORM_VISIBLE_STATE]
);


export const selectBillingCardFormError = createSelector(
  selectBillingDetailsState,
  (state: IBillingDetailsState) => state[BILLING_CARD_FORM_ERROR]
);
