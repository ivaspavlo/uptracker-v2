
import { DefaultInputErrors } from './default-input-errors-map';

export const LocationNameErrorsMap: Map<string, string> = new Map(Object.entries({
  ...DefaultInputErrors,
  required: 'Location Name is required',
}));

export const LocationTypeErrorsMap: Map<string, string> = new Map(Object.entries({
  ...DefaultInputErrors,
  required: 'Location Type is required',
}));

export const PhoneNumbersErrorMap: Map<string, string> = new Map(Object.entries({
  ...DefaultInputErrors,
  required: 'Phone Number is required',
}));

export const PrimaryTaxErrorsMap: Map<string, string> = new Map(Object.entries({
  ...DefaultInputErrors,
  required: 'Primary Tax is required',
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
  required: 'State/Provence is required',
}));

export const PostalCodeErrorsMap: Map<string, string> = new Map(Object.entries({
  ...DefaultInputErrors,
  required: 'Postal Code is required',
}));

export const CountryErrorsMap: Map<string, string> = new Map(Object.entries({
  ...DefaultInputErrors,
  required: 'Country is required',
}));
