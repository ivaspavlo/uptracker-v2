import { CardTypes } from '../constants/bank-card-types';

export interface IBankCard {
  active: boolean;
  card_number: string;
  brand: CardTypes;
  cvv: number;
  card_name: string;
  city: string;
  country: string;
  created_at: string;
  default: boolean;
  exp_month: number;
  exp_year: number;
  id: string;
  last4: number;
  line1: string;
  line2: string;
  name: string;
  postal_code: string;
  state: string;
  stripe_id: string;
  updated_at: string;
}

