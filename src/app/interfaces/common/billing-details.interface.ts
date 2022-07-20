export interface IBillingDetails {
  account_owner: string;
  address: {};
  billing_email_address: string;
  cancellation_notes: string;
  chart_of_accounts_added: boolean;
  company_name: string;
  contact_email_address: string;
  country_code: string;
  created_at: string;
  created_by: string;
  currency: string;
  fiscal_year: string;
  id: string;
  inventory_method: string;
  locations_added: boolean;
  make_inactive: boolean;
  make_inactive_on: string;
  maris_list_member: string;
  maris_list_pricing: boolean;
  max_locations: number;
  next_po_number: number;
  onboarding_step: number;
  payment_method_needs_update: boolean;
  payment_methods: Array<any>;
  payment_user_id: string;
  phone_number: string;
  phone_number_ext: string;
  po_prefix: string;
  primary_tax_rate: number;
  promo_code: string;
  purchase_order_template: string;
  require_subscription_on: string;
  required_onboarding_complete: boolean;
  secondary_tax_rate: number;
  show_welcome_view: boolean;
  status: string;
  stripe_customer_id: string;
  stripe_plan_id: string;
  stripe_subscription_id: string;
  stripe_subscription_item_id: string;
  subscription_plan_added: boolean;
  subscription_plan_required: boolean;
  updated_at: string;
  users_added: boolean;
}


