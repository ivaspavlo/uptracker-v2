
import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { IFormField, ICountryCode, IOption, IStripeFailureRes, IStripeError } from '@app/interfaces';
import { InputFormField, SelectFormField } from '@app/shared/utils';
import { FormControlType, INPUT_MASK_TYPES, UptrackerCountryCodes, StripeErrorParamTypes } from '@app/shared/constants';
import { listenForFormFieldErrors } from '@app/shared/utils';
import { CardNameErrorsMap, CardNumberErrorsMap, ExpDateErrorsMap, CVVErrorsMap, NameOnCardErrorsMap, AddressErrorsMap, CityErrorsMap, PostalCodeErrorsMap, CountryErrorsMap } from './constants';


export enum CardFormControlEnum {
  card_name = 'card_name',
  card_number = 'card_number',
  exp_date = 'exp_date',
  cvv = 'cvv',
  name_on_card = 'name_on_card',
  postal_code = 'postal_code',
  address = 'address',
  city = 'city',
  state = 'state',
  country = 'country',
  stripe_error = 'stripe_error'
}

class StripeErrorStateMatcher implements ErrorStateMatcher {
  private errorCode: string[];
  constructor(code: string[]) { this.errorCode = code; }
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const stripeErrorResponse: IStripeError = form ? form.value[CardFormControlEnum.stripe_error] : null;
    const hasError = (stripeErrorResponse && this.errorCode.includes(stripeErrorResponse.param)) || control.errors;
    return !!(control && hasError && (control.dirty || control.touched));
  }
}

@Component({
  selector: 'app-card-form',
  templateUrl: './card-form.component.html',
  styleUrls: ['./card-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardFormComponent implements OnInit {

  @Input() set stripeError(value: IStripeFailureRes) { if (this.form) { this.form.patchValue({ [CardFormControlEnum.stripe_error]: value }); } }
  @Output() formIsReady: EventEmitter<FormGroup> = new EventEmitter();

  public form: FormGroup;
  public fieldMap = new Map<CardFormControlEnum, IFormField>();
  public ctrlTypes = FormControlType;
  public cardNumberErrorMatcher = new StripeErrorStateMatcher([ StripeErrorParamTypes.number ]);
  public expDateErrorMatcher = new StripeErrorStateMatcher([ StripeErrorParamTypes.exp_year, StripeErrorParamTypes.exp_month ]);
  public cvcErrorMatcher = new StripeErrorStateMatcher([ StripeErrorParamTypes.cvc ]);

  private countryCodes: IOption[];
  private componentDestroyed$: Subject<void> = new Subject();

  constructor() { }

  ngOnInit(): void {
    this.initCountryCodeOptions(UptrackerCountryCodes);
    this.initFormFieldMap(this.fieldMap, CardFormControlEnum);
    this.initForm(CardFormControlEnum);
    listenForFormFieldErrors(CardFormControlEnum, this.fieldMap, this.form).pipe(takeUntil(this.componentDestroyed$)).subscribe();
    this.formIsReady.emit(this.form);
  }

  private initForm(ctrlEnum): void {
    this.form = new FormGroup({
      [ctrlEnum.card_name]: new FormControl(null, Validators.required),
      [ctrlEnum.name_on_card]: new FormControl(null, Validators.required),
      [ctrlEnum.postal_code]: new FormControl(null, Validators.required),
      [ctrlEnum.card_number]: new FormControl(null, Validators.required),
      [ctrlEnum.exp_date]: new FormControl(null, Validators.required),
      [ctrlEnum.cvv]: new FormControl(null, Validators.required),
      [ctrlEnum.address]: new FormControl(null, Validators.required),
      [ctrlEnum.city]: new FormControl(null, Validators.required),
      [ctrlEnum.country]: new FormControl(null, Validators.required),
      [ctrlEnum.state]: new FormControl(null),
      [ctrlEnum.stripe_error]: new FormControl(null)
    });
  }

  private initFormFieldMap(fieldMap: Map<CardFormControlEnum, IFormField>, ctrlEnum): void {
    fieldMap.set(ctrlEnum.card_name, new InputFormField({ formControlName: ctrlEnum.card_name, label: 'Card Name', requiredLabel: true, placeholder: 'Card Name', class: '', errorMap: CardNameErrorsMap }));
    fieldMap.set(ctrlEnum.card_number, new InputFormField({ errorStateMatcher: this.cardNumberErrorMatcher, formControlName: ctrlEnum.card_number, label: 'Credit Card Number', requiredLabel: true, mask: INPUT_MASK_TYPES.CARD, placeholder: 'Credit Card Number', class: 'witdh-percent-48', errorMap: CardNumberErrorsMap }));
    fieldMap.set(ctrlEnum.exp_date, new InputFormField({ errorStateMatcher: this.expDateErrorMatcher, formControlName: ctrlEnum.exp_date, label: 'Exp. Date', requiredLabel: true, mask: INPUT_MASK_TYPES.DATE, placeholder: 'Exp. Date', class: 'width-percent-22 mx-percent-4', errorMap: ExpDateErrorsMap }));
    fieldMap.set(ctrlEnum.cvv, new InputFormField({ errorStateMatcher: this.cvcErrorMatcher, formControlName: ctrlEnum.cvv, label: 'CVV', requiredLabel: true, mask: INPUT_MASK_TYPES.CVV, placeholder: 'CVV', class: 'width-percent-22', errorMap: CVVErrorsMap }));
    fieldMap.set(ctrlEnum.name_on_card, new InputFormField({ formControlName: ctrlEnum.name_on_card, label: 'Name on Card', requiredLabel: true, placeholder: 'Name on Card', class: '', errorMap: NameOnCardErrorsMap }));
    fieldMap.set(ctrlEnum.address, new InputFormField({ formControlName: ctrlEnum.address, label: 'Address', requiredLabel: true, placeholder: 'Address', icon: 'aim', errorMap: AddressErrorsMap }));
    fieldMap.set(ctrlEnum.city, new InputFormField({ formControlName: ctrlEnum.city, label: 'City', requiredLabel: true, placeholder: 'City', icon: 'house', class: 'witdh-percent-48 mr-percent-2', errorMap: CityErrorsMap }));
    fieldMap.set(ctrlEnum.postal_code, new InputFormField({ formControlName: ctrlEnum.postal_code, label: 'Billing Postal Code', requiredLabel: true, placeholder: 'Billing Postal Code', icon: 'envelope', class: 'witdh-percent-48 ml-percent-2', errorMap: PostalCodeErrorsMap }));
    fieldMap.set(ctrlEnum.state, new InputFormField({ formControlName: ctrlEnum.state, label: 'State/Province', requiredLabel: false, placeholder: 'State/Province', icon: 'globe', class: 'witdh-percent-48 mr-percent-2' }));
    fieldMap.set(ctrlEnum.country, new SelectFormField({ formControlName: ctrlEnum.country, options: this.countryCodes, label: 'Country', requiredLabel: true, class: 'witdh-percent-48 ml-percent-2',  errorMap: CountryErrorsMap }));
    fieldMap.set(ctrlEnum.stripe_error, new InputFormField({ formControlName: ctrlEnum.stripe_error, label: 'Stripe Error', visible: false }));
  }

  private initCountryCodeOptions(codes: ICountryCode): void {
    this.countryCodes = Object.keys(codes).map(key => ({
      label: key,
      value: codes[key].name,
      displayName: codes[key].name,
      visible: true,
      disabled: false,
      className: ''
    }));
  }

}
