
enum StripeValidationError {
  CARD_EXP_YEAR = 'card[exp_year]',
  EXP_YEAR = 'exp_year',
  CARD_EXP_MONTH = 'card[exp_month]',
  EXP_MONTH = 'exp_month',
  NUMBER = 'number',
  CVC = 'cvc',
}

export const hasCardNumberErrors = (errors): boolean => {
  return [StripeValidationError.NUMBER].includes(errors?.param);
};

export const hasExpDateErrors = (errors): boolean => {
  return [StripeValidationError.EXP_YEAR,
  StripeValidationError.CARD_EXP_YEAR,
  StripeValidationError.EXP_MONTH,
  StripeValidationError.CARD_EXP_MONTH].includes(errors?.param);
};

export const hasCvcErrors = (errors): boolean => {
  return [StripeValidationError.CVC].includes(errors?.param);
};
