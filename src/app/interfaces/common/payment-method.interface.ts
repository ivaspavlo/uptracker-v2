
export interface IPaymentMethod {
  stripe_token?: string;
  card_name: string;
  id?: string;
  billing_details: {
    address: {
      city: string;
      line1: string;
      line2: string;
      country: string;
      postal_code: number;
      state: string;
    },
    name: string;
  };
}
