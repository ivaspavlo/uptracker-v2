
export interface ILocation {
  account_id: string;
  address: {
    city: string;
    country: string;
    created_at: string;
    full_adddress: string;
    id: string;
    postal_code: string;
    province: string;
    state: string;
    street_1: string;
    street_2: string;
    suite: string;
  };
  updated_at: string;
  country_code: string;
  created_at: string;
  fax_country_code: string;
  fax_ext: string;
  fax_number: string;
  id: string;
  image: string;
  location_type: string;
  name: string;
  phone_number: string;
  phone_number_ext: string;
  primary_tax_rate: number;
  secondary_tax_rate: number;
}
