import { ACCOUNT_SETTINGS_TABS, PAYMENT_METODS, ACTIVE_TAB, FORM_DATA, IS_LOADING, BILLING_EMAIL } from '@app/modules/lazy-routable/account_settings/constants';
import { IAccountSettingsForm } from '../interfaces';
import { IBankCard } from './bank-card.interface';


export interface IAccountSettingsState {
  [ACTIVE_TAB]: ACCOUNT_SETTINGS_TABS;
  [FORM_DATA]: IAccountSettingsForm;
  [PAYMENT_METODS]: Array<IBankCard>;
  [BILLING_EMAIL]: string;
  [IS_LOADING]: boolean;
}
