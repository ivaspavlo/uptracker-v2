
import { IFormField, IBillingCard, IStripeErrorMessage } from '@app/interfaces';
import { FormControlType, INPUT_MASK_TYPES, UptrackerCountryCodes } from '@app/shared/constants';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import PlaceResult = google.maps.places.PlaceResult;
import { Subject, Observable } from 'rxjs';
import { OnDestroy } from '@angular/core';
import { BillingCardFormFormControl } from '../../../constants/billing-card-form-control';
import { CardNameErrorsMap, CardNumberErrorsMap, ExpDateErrorsMap, CVVErrorsMap, NameOnCardErrorsMap, PostalCodeErrorsMap, AddressErrorsMap, CityErrorsMap, StateErrorsMap, CountryErrorsMap } from '../../../constants';
import * as locationHelper from '../../../helpers';
import { InputFormField, optionsFromArray, optionsFromCountryCodes, SelectFormField } from '@app/shared/utils';
import { IBankCard } from '../../../interfaces';



export class BillingCardModalPresenter implements OnDestroy {

  public FormControlType = FormControlType;
  private componentDestroyed$: Subject<any> = new Subject();


  public getFormFieldMap(isEdit: boolean): Map<BillingCardFormFormControl, IFormField> {
    const fieldMap = new Map<BillingCardFormFormControl, IFormField>();
    fieldMap.set(
      BillingCardFormFormControl.card_name,
      new InputFormField({
        formControlName: BillingCardFormFormControl.card_name,
        label: 'Card Name',
        placeholder: 'Card Name',
        errorMap: CardNameErrorsMap,
        requiredLabel: true
      }));

    fieldMap.set(
      BillingCardFormFormControl.id,
      new InputFormField({
        formControlName: BillingCardFormFormControl.id,
        label: '',
        visible: false,
      }));

    if (!isEdit) {
      fieldMap.set(
        BillingCardFormFormControl.card_number,
        new InputFormField({
          formControlName: BillingCardFormFormControl.card_number,
          label: 'Card Number', placeholder: 'XXXX XXXX XXXX XXXX', class: 'col-md-6 pl-md-0 pr-px-24',
          mask: INPUT_MASK_TYPES.CARD,
          errorMap: CardNumberErrorsMap,
          requiredLabel: true
        }));
      fieldMap.set(
        BillingCardFormFormControl.exp_date,
        new InputFormField({
          formControlName: BillingCardFormFormControl.exp_date,
          label: 'Exp. Date', placeholder: '**/**', class: 'col-md-3 pl-md-0 pr-px-24',
          mask: INPUT_MASK_TYPES.DATE,
          errorMap: ExpDateErrorsMap,
          requiredLabel: true
        }));
      fieldMap.set(
        BillingCardFormFormControl.cvv,
        new InputFormField({
          formControlName: BillingCardFormFormControl.cvv,
          label: 'CVV', placeholder: '***', class: 'col-md-3 pl-md-0 pr-md-0',
          mask: INPUT_MASK_TYPES.CVV,
          errorMap: CVVErrorsMap,
          requiredLabel: true
        }));
    }

    fieldMap.set(
      BillingCardFormFormControl.name_on_card,
      new InputFormField({
        formControlName: BillingCardFormFormControl.name_on_card,
        label: 'Name on Card', placeholder: '', class: 'col-md-6 pl-md-0 pr-px-24',
        errorMap: NameOnCardErrorsMap,
        requiredLabel: true
      }));
    fieldMap.set(
      BillingCardFormFormControl.postal_code,
      new InputFormField({
        formControlName: BillingCardFormFormControl.postal_code,
        label: 'Postal Code', placeholder: '', class: 'col-md-6 pl-md-0 pr-md-0', icon: 'postal-code',
        errorMap: PostalCodeErrorsMap,
        requiredLabel: true
      }));

    fieldMap.set(
      BillingCardFormFormControl.address,
      new InputFormField({
        formControlName: BillingCardFormFormControl.address,
        label: 'Address', placeholder: '', icon: 'address',
        errorMap: AddressErrorsMap,
        requiredLabel: true
      }));

    fieldMap.set(
      BillingCardFormFormControl.city,
      new InputFormField({
        formControlName: BillingCardFormFormControl.city,
        label: 'City', placeholder: '', icon: 'city',
        errorMap: CityErrorsMap,
        requiredLabel: true
      }));


    fieldMap.set(
      BillingCardFormFormControl.state,
      new InputFormField({
        formControlName: BillingCardFormFormControl.state,
        label: 'State/Province',
        placeholder: 'State/Province', icon: 'state', class: 'col-md-6 pl-md-0 pr-px-24',
        errorMap: StateErrorsMap,
        requiredLabel: true
      }));

    fieldMap.set(
      BillingCardFormFormControl.country,
      new SelectFormField({
        formControlName: BillingCardFormFormControl.country,
        label: 'Country',
        options: optionsFromCountryCodes(UptrackerCountryCodes),
        class: 'col-md-6 pr-md-0 pl-md-0',
        errorMap: CountryErrorsMap,
        requiredLabel: true
      }));

    return fieldMap;
  }

  public getForm(card: IBankCard = null, isEdit: boolean): FormGroup {
    const addForm = new FormGroup({
      [BillingCardFormFormControl.id]: new FormControl((card) ? card.id : null),
      [BillingCardFormFormControl.card_name]: new FormControl((card) ? card.card_name : null, Validators.required),
      [BillingCardFormFormControl.name_on_card]: new FormControl((card) ? card.name : null, Validators.required),
      [BillingCardFormFormControl.postal_code]: new FormControl((card) ? card.postal_code : null, Validators.required),
      [BillingCardFormFormControl.card_number]: new FormControl('', [Validators.required, Validators.minLength(15)]),
      [BillingCardFormFormControl.exp_date]: new FormControl('', [Validators.required, Validators.minLength(5)]),
      [BillingCardFormFormControl.cvv]:  new FormControl('', [Validators.required, Validators.minLength(3)]),
      [BillingCardFormFormControl.address]: new FormControl((card) ? card.line1 : null, Validators.required),
      [BillingCardFormFormControl.city]: new FormControl((card) ? card.city : null, Validators.required),
      [BillingCardFormFormControl.state]: new FormControl((card) ? card.state : null),
      [BillingCardFormFormControl.country]: new FormControl((card) ? card.country : null, Validators.required),
    });
    const editForm = new FormGroup({
      [BillingCardFormFormControl.id]: new FormControl((card) ? card.id : null),
      [BillingCardFormFormControl.card_name]: new FormControl((card) ? card.card_name : null, Validators.required),
      [BillingCardFormFormControl.name_on_card]: new FormControl((card) ? card.name : null, Validators.required),
      [BillingCardFormFormControl.postal_code]: new FormControl((card) ? card.postal_code : null, Validators.required),
      [BillingCardFormFormControl.address]: new FormControl((card) ? card.line1 : null, Validators.required),
      [BillingCardFormFormControl.city]: new FormControl((card) ? card.city : null, Validators.required),
      [BillingCardFormFormControl.state]: new FormControl((card) ? card.state : null),
      [BillingCardFormFormControl.country]: new FormControl((card) ? card.country : null, Validators.required),
    });
    return (isEdit) ? editForm : addForm;
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

    if (street) {
      const str = (streetNumber) ? streetNumber.long_name + ' ' + street.long_name : street.long_name;
      form.patchValue({ [BillingCardFormFormControl.address]: str });
    } else {
      form.patchValue({ [BillingCardFormFormControl.address]: formattedAddressName });
    }
    form.patchValue({ [BillingCardFormFormControl.city]: (city) ? city.long_name : '' });
    form.patchValue({ [BillingCardFormFormControl.state]: (state) ? state.long_name : '' });
    form.patchValue({ [BillingCardFormFormControl.postal_code]: (postalCode) ? postalCode.long_name : '' });
    form.patchValue({ [BillingCardFormFormControl.country]: (country) ? country.long_name : '' });
  }


  ngOnDestroy(): void {
    this.componentDestroyed$.next();
    this.componentDestroyed$.complete();
  }


}
