
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subject, Observable } from 'rxjs';
import PlaceResult = google.maps.places.PlaceResult;

import { ILocationRequest, IFormField, IOption, ILocation, ICurrency } from '@app/interfaces';
import { InputFormField, SelectFormField, optionsFromEnum, CustomFormField, AutocompleteFormField, optionsFromArray, FormOption } from '@app/shared/utils';
import { COUNTRIES, FormControlType } from '@app/shared/constants';
import { createTelInputValidator } from '@app/modules/ui-elements/tel-input/validators/tel-input.validator';
import * as locationHelper from '@app/shared/helpers/location-parser.helper';

import { AddLocationFormControl } from './constants/add-location-form-control';
import { LocationNameErrorsMap, PrimaryTaxErrorsMap, CountryErrorsMap, PostalCodeErrorsMap, StateErrorsMap, CityErrorsMap, AddressErrorsMap, PhoneNumbersErrorMap, LocationTypeErrorsMap } from './constants/input-errors-map';
import { ILocationForm } from './interfaces';
import { EventEmitter } from '@angular/core';
import { takeUntil } from 'rxjs/operators';

enum LOCATION_TYPE {
  Primary = 'Primary Location',
  Standalone = 'Standalone Location',
  Satellite = 'Satellite Location'
}
export class AddLocationPresenter {

  public FormControlType = FormControlType;

  private imgSelected = new Subject<void>();
  public imgSelected$: Observable<void> = this.imgSelected.asObservable();

  private formSubmitted = new Subject<any>();
  public formSubmitted$: Observable<any> = this.formSubmitted.asObservable();

  private clearForm = new Subject<any>();
  public clearForm$: Observable<any> = this.clearForm.asObservable();


  public onFormSubmit(value): void {
    this.formSubmitted.next(this.getRequestData(value));
  }

  public onImgSelected(): void {
    this.imgSelected.next();
  }

  filteredOptions(options: IOption[] = [], form: FormGroup) {
    return options.filter(option => option.label.toLocaleLowerCase().includes(form.get('country').value));
  }

  public isInputControlVisible(field: IFormField): boolean {
    return field.visible && field.formControlType === FormControlType.Input;
  }

  public isCustomField(field: IFormField): boolean {
    return field.formControlType === FormControlType.Custom;
  }

  public isInputWithAutocomplete(field: IFormField): boolean {
    return field.visible && field.formControlName === AddLocationFormControl.street_1;
  }

  public isInputTypeSelector(field: IFormField): boolean {
    return field.visible && field.formControlType === FormControlType.Select;
  }

  public isInputTypeAutocomplete(field: IFormField): boolean {
    return field.visible && field.formControlType === FormControlType.Autocomplete;
  }

  public emitValue<T>(obs: Observable<T>, subj: EventEmitter<T>): void {
    obs.pipe(
    ).subscribe((val) => subj.emit(val));
  }

  public getRequestData(formValue: ILocationForm): ILocationRequest {
    const valueToSend: ILocationRequest = {
      id: formValue.id,
      image: formValue.img,
      name: formValue.location_name,
      full_address: formValue.address,
      street_1: formValue.street_1,
      street_2: formValue.street_2,
      suite: formValue.suite_number,
      city: formValue.city,
      state: formValue.state,
      province: formValue.state,
      country: formValue.country,
      postal_code: formValue.postal_code,
      phone_number: formValue.phone_number['phone_number'],
      phone_number_ext: formValue.phone_number['country_code'],
      country_code: formValue.phone_number['country_code'],
      fax_number: null,
      fax_number_ext: null,
      fax_country_code: null,
      email_address: null,
      primary_tax_rate: formValue.primary_tax,
      secondary_tax_rate: formValue.secondary_tax
    };
    return valueToSend;
  }

  public getFormFieldMap(currencies: ICurrency[]): Map<AddLocationFormControl, IFormField> {
    const fieldMap = new Map<AddLocationFormControl, IFormField>();

    fieldMap.set(
      AddLocationFormControl.location_name,
      new InputFormField({
        formControlName: AddLocationFormControl.location_name,
        label: 'Location Name',
        placeholder: 'Location Name',
        errorMap: LocationNameErrorsMap,
        requiredLabel: true
      }));
    fieldMap.set(
      AddLocationFormControl.location_type,
      new SelectFormField({
        formControlName: AddLocationFormControl.location_type,
        label: 'Location Type',
        visible: true,
        options: optionsFromEnum(LOCATION_TYPE),
        class: 'col-md-6 pl-md-0 pr-px-12',
        errorMap: LocationTypeErrorsMap,
        requiredLabel: true
      }));
    fieldMap.set(
      AddLocationFormControl.phone_number,
      new CustomFormField({
        formControlName: AddLocationFormControl.phone_number,
        fieldKey: AddLocationFormControl.phone_number,
        label: 'Phone Number',
        class: 'col-md-6 pr-md-0 pl-px-12',
        errorMap: PhoneNumbersErrorMap,
        requiredLabel: true
      }));
    fieldMap.set(
      AddLocationFormControl.id,
      new InputFormField({
        formControlName: AddLocationFormControl.id,
        label: '', placeholder: '', visible: false
      }));
    fieldMap.set(
      AddLocationFormControl.img,
      new InputFormField({
        formControlName: AddLocationFormControl.img,
        label: '', placeholder: '', visible: false
      }));
    fieldMap.set(
      AddLocationFormControl.address,
      new InputFormField({
        formControlName: AddLocationFormControl.address,
        label: '', placeholder: '', visible: false
      }));
    fieldMap.set(
      AddLocationFormControl.street_1,
      new InputFormField({
        formControlName: AddLocationFormControl.street_1,
        label: 'Address', placeholder: 'Address', icon: 'address',
        errorMap: AddressErrorsMap,
        requiredLabel: true
      }));
    fieldMap.set(
      AddLocationFormControl.street_2,
      new InputFormField({
        formControlName: AddLocationFormControl.street_2,
        label: 'Address 2', placeholder: 'Address 2'
      }));
    fieldMap.set(
      AddLocationFormControl.city,
      new InputFormField({
        formControlName: AddLocationFormControl.city,
        label: 'City', placeholder: 'City', icon: 'city', class: 'col-md-6 pl-md-0 pr-px-12',
        errorMap: CityErrorsMap,
        requiredLabel: true
      }));
    fieldMap.set(
      AddLocationFormControl.state,
      new InputFormField({
        formControlName: AddLocationFormControl.state,
        label: 'State/Province', placeholder: 'State/Province', icon: 'state', class: 'col-md-6 pr-md-0 pl-px-12',
        errorMap: StateErrorsMap,
        requiredLabel: true
      }));
    fieldMap.set(
      AddLocationFormControl.suite_number,
      new InputFormField({
        formControlName: AddLocationFormControl.suite_number,
        label: 'Suite Number', placeholder: 'Suite Number', class: 'col-md-6 pl-md-0 pr-px-12',
      }));
    fieldMap.set(
      AddLocationFormControl.postal_code,
      new InputFormField({
        formControlName: AddLocationFormControl.postal_code,
        label: 'Postal Code', placeholder: 'Postal Code', icon: 'postal-code', class: 'col-md-6 pr-md-0 pl-px-12',
        errorMap: PostalCodeErrorsMap,
        requiredLabel: true
      }));

    fieldMap.set(
      AddLocationFormControl.country,
      new AutocompleteFormField({
        formControlName: AddLocationFormControl.country,
        label: 'Country',
        visible: true,
        options: optionsFromArray(COUNTRIES),
        errorMap: CountryErrorsMap,
        requiredLabel: true
      }));
    fieldMap.set(
      AddLocationFormControl.primary_tax,
      new InputFormField({
        formControlName: AddLocationFormControl.primary_tax,
        label: 'Primary Tax', placeholder: 'Primary Tax', class: 'col-md-4 pl-md-0 pr-px-12', icon: 'percent',
        errorMap: PrimaryTaxErrorsMap,
        requiredLabel: true
      }));
    fieldMap.set(
      AddLocationFormControl.secondary_tax,
      new InputFormField({
        formControlName: AddLocationFormControl.secondary_tax,
        label: 'Secondary Tax', placeholder: 'Secondary Tax', class: 'col-md-4 pl-px-12 pr-px-12', icon: 'percent'
      }));
    fieldMap.set(
      AddLocationFormControl.currency,
      new SelectFormField({
        formControlName: AddLocationFormControl.currency,
        label: 'Currency', class: 'col-md-4 pr-md-0 pl-px-12',
        options: this.getCurrenciesForDropdownOptions(currencies),
        visible: true, requiredLabel: true
      }));
    return fieldMap;
  }

  public getForm(formData: ILocation = null): FormGroup {
    return new FormGroup({
      [AddLocationFormControl.id]: new FormControl(formData ? formData.id : null),
      [AddLocationFormControl.location_name]: new FormControl((formData) ? formData.name : null, Validators.required),
      [AddLocationFormControl.location_type]: new FormControl((formData) ? formData.location_type : null, Validators.required),
      [AddLocationFormControl.img]: new FormControl((formData) ? formData.image : null),
      [AddLocationFormControl.phone_number]: new FormControl(
        {
          phone_number: (formData) ? formData.phone_number : null,
          country_code: (formData) ? formData.country_code : null
        },
        { validators: createTelInputValidator() }),
      [AddLocationFormControl.address]: new FormControl(),
      [AddLocationFormControl.street_1]: new FormControl((formData) ? formData.address.street_1 : null, Validators.required),
      [AddLocationFormControl.street_2]: new FormControl((formData) ? formData.address.street_2 : null),
      [AddLocationFormControl.state]: new FormControl((formData) ? formData.address.state : null, Validators.required),
      [AddLocationFormControl.city]: new FormControl((formData) ? formData.address.city : null, Validators.required),
      [AddLocationFormControl.postal_code]: new FormControl((formData) ? formData.address.postal_code : null, Validators.required),
      [AddLocationFormControl.suite_number]: new FormControl((formData) ? formData.address.suite : null),
      [AddLocationFormControl.country]: new FormControl((formData) ? formData.address.country : null, Validators.required),
      [AddLocationFormControl.primary_tax]: new FormControl((formData) ? formData.primary_tax_rate : null, Validators.required),
      [AddLocationFormControl.secondary_tax]: new FormControl((formData) ? formData.secondary_tax_rate : null),
      [AddLocationFormControl.currency]: new FormControl(null, Validators.required),
    });
  }

  public onLocationSelected(result: PlaceResult, form: FormGroup): void {
    const helper = locationHelper.parser(result);
    const formattedAddressName = helper(locationHelper.getFormattedAddress);
    const postalCode = helper(locationHelper.getPostalCode);
    const state = helper(locationHelper.getState);
    const city = helper(locationHelper.getCity);
    const street = helper(locationHelper.getStreet);
    const streetNumber = helper(locationHelper.getStreetNumber);
    const country = helper(locationHelper.getCountry);
    const img = locationHelper.getLocationStreetView(formattedAddressName, '144x144');

    if (street) {
      const str = (streetNumber) ? streetNumber.long_name + ' ' + street.long_name : street.long_name;
      form.patchValue({ [AddLocationFormControl.street_1]: str });
    } else {
      form.patchValue({ [AddLocationFormControl.street_1]: formattedAddressName });
    }
    form.patchValue({ [AddLocationFormControl.address]: result.formatted_address });
    form.patchValue({ [AddLocationFormControl.img]: (img) ? img : null });
    form.patchValue({ [AddLocationFormControl.city]: (city) ? city.long_name : '' });
    form.patchValue({ [AddLocationFormControl.street_2]: '' });
    form.patchValue({ [AddLocationFormControl.suite_number]: '' });
    form.patchValue({ [AddLocationFormControl.state]: (state) ? state.long_name : '' });
    form.patchValue({ [AddLocationFormControl.postal_code]: (postalCode) ? postalCode.long_name : '' });
    form.patchValue({ [AddLocationFormControl.country]: (country) ? country.long_name : '' });
  }

  public updateStreetImage(img: string, form: FormGroup): void {
    form.patchValue({ [AddLocationFormControl.img]: img });
  }

  private getCurrenciesForDropdownOptions(currencies: ICurrency[]): FormOption[] {
    if (!currencies) { return []; }
    const currenciesEnum = Object.keys(currencies).reduce((acc, key) => ({
      ...acc, [currencies[key].iso_code]: currencies[key].iso_code
    }), {});
    return optionsFromEnum(currenciesEnum);
  }

}
