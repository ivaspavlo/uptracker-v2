
import { IStripeFailureRes, IPaymentMethod } from '@app/interfaces';

export interface IAccountData {
  id: string;
  locations_added: boolean;
  payment_method_needs_update: boolean;
  subscription_plan_required: boolean;
  users_added: boolean;
  max_locations: number;
  payment_methods: IPaymentMethod[];
  stripe_error?: IStripeFailureRes;
  [key: string]: any;
}
