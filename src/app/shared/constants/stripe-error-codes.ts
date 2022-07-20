export const enum STRIPE_ERROR_CODE {
  INVALID_NUMBER = 'invalid_number',
  PARAMETER_MISSING = 'parameter_missing',
  INVALID_CVC = 'invalid_cvc',
}

export const enum STRIPE_ERROR_PARAM {
  EXP_YEAR = 'card[exp_year]',
  CARD_NUMBER = 'number',
  CVC = 'cvc'
}
