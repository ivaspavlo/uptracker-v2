import { createAction, props } from '@ngrx/store';
import { IBillingHistoryResponce, IBankCard } from '../../interfaces';
import { ResultState } from '@app/shared/constants';
import { IBillingCard, IPaymentRes } from '@app/interfaces';


export enum BILLING_DETAILS_ACTION_TYPES {
  BILLING_DETAILS_CARDS = '[BILLING_DETAILS cards]',
  BILLING_DETAILS_CARDS_SUCCESS = '[BILLING_DETAILS cards success]',
  BILLING_DETAILS_ADD_CARD = '[BILLING_DETAILS add card]',
  BILLING_DETAILS_ADD_CARD_SUCCESS = '[BILLING_DETAILS add card success]',
  BILLING_DETAILS_ADD_CARD_ERROR = '[BILLING_DETAILS add card error]',
  BILLING_DETAILS_EDIT_CARD = '[BILLING_DETAILS edit card]',
  BILLING_DETAILS_EDIT_CARD_SUCCESS = '[BILLING_DETAILS edit card success]',
  BILLING_DETAILS_DELETE_CARD = '[BILLING_DETAILS delete card]',
  SET_CARD_TO_ACTIVE = '[BILLING_DETAILS set card to active]',
  UPDATE_BILLING_EMAIL = '[BILLING_DETAILS update billing email]',
  BILLING_DETAILS_HISTORY = '[BILLING_DETAILS history]',
  CLEAR_BILLING_DETAILS_HISTORY = '[BILLING_DETAILS history clear]',
  BILLING_DETAILS_SUCCESS_HISTORY = '[BILLING_DETAILS success history]',
  BILLING_DETAILS_CLEAR_FORM_ERRORS = '[BILLING_DETAILS clear form errors]'
}

export const getBillingCardsAction = createAction(
  BILLING_DETAILS_ACTION_TYPES.BILLING_DETAILS_CARDS);

export const successBillingCardsAction = createAction(
  BILLING_DETAILS_ACTION_TYPES.BILLING_DETAILS_CARDS_SUCCESS, props<ResultState<IBankCard[]>>());

export const getHistoryAction = createAction(
  BILLING_DETAILS_ACTION_TYPES.BILLING_DETAILS_HISTORY, props<{ page: number }>());

export const clearHistoryAction = createAction(
  BILLING_DETAILS_ACTION_TYPES.CLEAR_BILLING_DETAILS_HISTORY);

export const successHistoryAction = createAction(
  BILLING_DETAILS_ACTION_TYPES.BILLING_DETAILS_SUCCESS_HISTORY, props<ResultState<IBillingHistoryResponce>>());

export const addBillingCardsAction = createAction(
  BILLING_DETAILS_ACTION_TYPES.BILLING_DETAILS_ADD_CARD, props<IBillingCard>());

export const addBillingCardsSuccessAction = createAction(BILLING_DETAILS_ACTION_TYPES.BILLING_DETAILS_ADD_CARD_SUCCESS, props<ResultState<IPaymentRes>>());

export const addBillingCardsErrorAction = createAction(BILLING_DETAILS_ACTION_TYPES.BILLING_DETAILS_ADD_CARD_ERROR, props<ResultState<IPaymentRes>>());

export const deleteBillingCardAction = createAction(
  BILLING_DETAILS_ACTION_TYPES.BILLING_DETAILS_DELETE_CARD, props<any>());

export const setActiveCardAction = createAction(
  BILLING_DETAILS_ACTION_TYPES.SET_CARD_TO_ACTIVE, props<any>());

export const updateBillingEmailAction = createAction(
  BILLING_DETAILS_ACTION_TYPES.UPDATE_BILLING_EMAIL, props<any>());

export const clearBillingCardFormErrorsAction = createAction(
  BILLING_DETAILS_ACTION_TYPES.BILLING_DETAILS_CLEAR_FORM_ERRORS);

export const editBillingCardAction = createAction(
  BILLING_DETAILS_ACTION_TYPES.BILLING_DETAILS_EDIT_CARD, props<IBillingCard>());

export const editBillingCardActionSuccess = createAction(
  BILLING_DETAILS_ACTION_TYPES.BILLING_DETAILS_EDIT_CARD_SUCCESS);
