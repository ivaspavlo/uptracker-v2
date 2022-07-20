declare var Stripe: Stripe;

interface Stripe {
  card: { createToken: Function };
  setPublishableKey: Function
}
