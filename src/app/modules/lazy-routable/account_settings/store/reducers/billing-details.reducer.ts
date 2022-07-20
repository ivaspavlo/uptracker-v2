import { IBillingDetailsState, IBankCard, IBillingHistoryResponce } from '../../interfaces';
import { LoadingState, ResultState } from '@app/shared/constants';
import { Action, createReducer, on } from '@ngrx/store';
import * as BillingDetailsActions from '../actions/billing-details.actions';
import { BILLING_CARDS, BILLING_HISTORY, CALL_STATE, BILLING_HISTORY_LOADING_STATE, BILLING_CARDS_LOADING_STATE, BILLING_CARD_FORM_LOADING_STATE, BILLING_CARD_FORM_VISIBLE_STATE, BILLING_CARD_FORM_ERROR } from '@app/modules/lazy-routable/account_settings/constants/keys';

export const initialState: IBillingDetailsState = {
  [BILLING_CARDS]: [],
  [BILLING_HISTORY]: { billing_history: [], count: 0, last_page: 0 },
  [BILLING_HISTORY_LOADING_STATE]: LoadingState.INIT,
  [BILLING_CARDS_LOADING_STATE]: LoadingState.INIT,
  [BILLING_CARD_FORM_LOADING_STATE]: LoadingState.INIT,
  [BILLING_CARD_FORM_VISIBLE_STATE]: false,
  [BILLING_CARD_FORM_ERROR]: {}
};

const billingDetailsReducer = createReducer<IBillingDetailsState, Action>(
  initialState,
  on(BillingDetailsActions.getHistoryAction, (state: IBillingDetailsState) => {
    return { ...state, [BILLING_HISTORY_LOADING_STATE]: LoadingState.LOADING };
  }),
  on(BillingDetailsActions.clearHistoryAction, (state: IBillingDetailsState) => {
    return { ...state, [BILLING_HISTORY]: { billing_history: [], count: state.billingHistory.count, last_page: 0 } };
  }),
  on(BillingDetailsActions.getBillingCardsAction, (state: IBillingDetailsState) => {
    return { ...state, [BILLING_CARDS_LOADING_STATE]: LoadingState.LOADING };
  }),
  on(BillingDetailsActions.successHistoryAction, (state: IBillingDetailsState, resultState) => {
    const histArray: IBillingHistoryResponce = state.billingHistory;
    const histResp: IBillingHistoryResponce = {
      count: resultState.result.count,
      last_page: resultState.result.last_page,
      billing_history: histArray.billing_history.concat(resultState.result.billing_history)
    };
    return { ...state, [BILLING_HISTORY]: histResp, [BILLING_HISTORY_LOADING_STATE]: LoadingState.LOADED };
  }),
  on(BillingDetailsActions.successBillingCardsAction, (state: IBillingDetailsState, { result, callState }: ResultState<IBankCard[]>) => {
    return { ...state, [BILLING_CARDS]: result, [BILLING_CARDS_LOADING_STATE]: LoadingState.LOADED, [BILLING_CARD_FORM_VISIBLE_STATE]: false };
  }),
  on(BillingDetailsActions.addBillingCardsAction, (state: IBillingDetailsState) => {
    return { ...state, [BILLING_CARD_FORM_LOADING_STATE]: LoadingState.LOADING, [BILLING_CARD_FORM_VISIBLE_STATE]: true };
  }),
  on(BillingDetailsActions.addBillingCardsSuccessAction, (state: IBillingDetailsState) => {
    return { ...state, [BILLING_CARD_FORM_LOADING_STATE]: LoadingState.LOADED, [BILLING_CARD_FORM_VISIBLE_STATE]: false };
  }),
  on(BillingDetailsActions.addBillingCardsErrorAction, (state: IBillingDetailsState, { result, callState }: ResultState<any>) => {
    return { ...state, [BILLING_CARD_FORM_LOADING_STATE]: LoadingState.LOADED, [BILLING_CARD_FORM_VISIBLE_STATE]: true, [BILLING_CARD_FORM_ERROR]: (result) ? result['stripe_error'] : null};
  }),
  on(BillingDetailsActions.clearBillingCardFormErrorsAction, (state: IBillingDetailsState) => {
    return { ...state, [BILLING_CARD_FORM_ERROR]: null };
  }),
  on(BillingDetailsActions.editBillingCardAction, (state: IBillingDetailsState) => {
    return { ...state, [BILLING_CARD_FORM_LOADING_STATE]: LoadingState.LOADING, [BILLING_CARD_FORM_VISIBLE_STATE]: true };
  }),
  on(BillingDetailsActions.editBillingCardActionSuccess, (state: IBillingDetailsState) => {
    return { ...state, [BILLING_CARD_FORM_LOADING_STATE]: LoadingState.LOADED, [BILLING_CARD_FORM_VISIBLE_STATE]: false };
  })
);

export function reducer(state: IBillingDetailsState = initialState, action: Action) {
  return billingDetailsReducer(state, action);
}
