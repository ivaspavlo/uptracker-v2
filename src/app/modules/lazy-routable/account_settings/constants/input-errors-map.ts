
import { DefaultInputErrors } from './default-input-errors-map';

export const CompanyNameErrorsMap: Map<string, string> = new Map(Object.entries({
  ...DefaultInputErrors,
  required: 'Company Name is required',
}));


export const CardNameErrorsMap: Map<string, string> = new Map(Object.entries({
  ...DefaultInputErrors,
  required: 'Card Name is required',
}));

export const CardNumberErrorsMap: Map<string, string> = new Map(Object.entries({
  ...DefaultInputErrors,
  required: 'Card Number is required',
  minlength: 'Card Number format should be correct'
}));

export const ExpDateErrorsMap: Map<string, string> = new Map(Object.entries({
  ...DefaultInputErrors,
  required: 'Required',
  minlength: 'Not completed'
}));

export const CVVErrorsMap: Map<string, string> = new Map(Object.entries({
  ...DefaultInputErrors,
  required: 'CVV is required',
  minlength: 'Not completed'
}));

export const NameOnCardErrorsMap: Map<string, string> = new Map(Object.entries({
  ...DefaultInputErrors,
  required: 'Name on Card is required',
}));

export const PostalCodeErrorsMap: Map<string, string> = new Map(Object.entries({
  ...DefaultInputErrors,
  required: 'Postal Code is required',
}));


export const EmailAddressErrorsMap: Map<string, string> = new Map(Object.entries({
  ...DefaultInputErrors,
  required: 'Email is required',
}));

export const AddressErrorsMap: Map<string, string> = new Map(Object.entries({
  ...DefaultInputErrors,
  required: 'Address is required',
}));

export const CityErrorsMap: Map<string, string> = new Map(Object.entries({
  ...DefaultInputErrors,
  required: 'City is required',
}));

export const StateErrorsMap: Map<string, string> = new Map(Object.entries({
  ...DefaultInputErrors,
  required: 'State/Province is required',
}));

export const CountryErrorsMap: Map<string, string> = new Map(Object.entries({
  ...DefaultInputErrors,
  required: 'Country is required',
}));
