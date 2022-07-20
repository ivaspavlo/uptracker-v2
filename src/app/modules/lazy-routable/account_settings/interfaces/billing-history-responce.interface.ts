import { IBillingHistory } from './billing-history.interface';

export interface IBillingHistoryResponce {
  billing_history: Array<IBillingHistory>;
  count: number;
  last_page: number;
}
