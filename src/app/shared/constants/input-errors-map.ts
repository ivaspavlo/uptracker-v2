
export const MUST_MATCH_ERROR_NAME = 'mustMatch';

export const DefaultInputErrors: { [key: string]: string } = {
  required: 'This field is required',
  minlength: 'The value is too small',
  maxlength: 'The value is too big'
};

export const DefaultInputErrorsMap: Map<string, string> = new Map(Object.entries(DefaultInputErrors));

export const PasswordInputErrorsMap: Map<string, string> = new Map(Object.entries({
  ...DefaultInputErrors,
  required: 'Password is required',
  minlength: 'Password must contain at least 8 symbols',
  [MUST_MATCH_ERROR_NAME]: 'Passwords must match'
}));

export const EmailInputErrorsMap: Map<string, string> = new Map(Object.entries({
  ...DefaultInputErrors,
  required: 'Email is required',
  email: 'Not a valid email',
  emailAddressUsed: 'Email address is already in use'
}));
