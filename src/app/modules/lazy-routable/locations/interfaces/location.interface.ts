export interface ILocationRequest {
  id: string;
  name: string;
  image: string;
  full_address: string;
  street_1: string;
  street_2: string;
  suite: string;
  city: string;
  state: string;
  province: string;
  country: string;
  postal_code: string;
  phone_number: string;
  phone_number_ext: string;
  country_code: string;
  fax_number: string;
  fax_number_ext: string;
  fax_country_code: string;
  email_address: string;
  primary_tax_rate: number;
  secondary_tax_rate: number;
}
