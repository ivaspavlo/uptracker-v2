
import { IRole } from './permits.interface';

export interface IUserProfile {
  name: string;
  email_address: string;
  default_location_id: string;
  phone_number: string;
  department: string;
  country_code: string;
  avatar: string;
  account_id: string;
  id: string;
  role: IRole;
  onboarding?: IOnboarding;
  on_boarding?: IOnboarding; // TODO remove after api change
}

export interface IOnboarding {
  complete: boolean;
  step: number;
}
