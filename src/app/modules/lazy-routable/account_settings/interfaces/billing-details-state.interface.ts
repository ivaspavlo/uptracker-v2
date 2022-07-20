import {  BILLING_CARDS, BILLING_HISTORY, CALL_STATE, BILLING_HISTORY_LOADING_STATE, BILLING_CARDS_LOADING_STATE, BILLING_CARD_FORM_LOADING_STATE, BILLING_CARD_FORM_VISIBLE_STATE, BILLING_CARD_FORM_ERROR } from '@app/modules/lazy-routable/account_settings/constants';

import { CallState } from '@app/shared/constants';
import { IBillingHistoryResponce } from './billing-history-responce.interface';
import { IStripeErrorMessage } from '@app/interfaces';


export interface IBillingDetailsState {
  [BILLING_CARDS]: Array<any>;
  [BILLING_HISTORY]: IBillingHistoryResponce;
  [BILLING_HISTORY_LOADING_STATE]: CallState;
  [BILLING_CARDS_LOADING_STATE]: CallState;
  [BILLING_CARD_FORM_LOADING_STATE]: CallState;
  [BILLING_CARD_FORM_VISIBLE_STATE]: boolean;
  [BILLING_CARD_FORM_ERROR]: {};
}
