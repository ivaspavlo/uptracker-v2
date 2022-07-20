import { Store } from '@ngrx/store';
import { IFormField } from '@app/interfaces';
import { Component, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { InputFormField, listenForFormFieldErrors, СheckboxFormField, optionsFromArray, AutocompleteFormField } from '@app/shared/utils';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { takeUntil, first } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';
import { FormControlType } from '@app/shared/constants';
import { AccountSettingsFormControl } from '../constants/account-settings-form-control';

import { selectAccountSettingsTab, selectAccountSettingsFormData, selecFormLoading, selectPaymentMetods, selectbillingEmail } from '../store/selectors';
import { CompanyNameErrorsMap, AddressErrorsMap, CityErrorsMap, StateErrorsMap, CountryErrorsMap } from '../constants/input-errors-map';
import * as AccountSettingsActions from '../store/actions/account-settings.actions';
import { IAccountSettingsForm, IBankCard } from '../interfaces';
import { ResultState } from '../interfaces/result-state.interface';
import { COUNTRIES } from '../models';
import * as locationHelper from '../helpers';

import PlaceResult = google.maps.places.PlaceResult;
import { IAccountSettingsState } from '../interfaces';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { selectTabAction } from '../store/actions/account-settings.actions';


@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountSettingsComponent implements OnDestroy {

  public readonly fieldMap = new Map<AccountSettingsFormControl, IFormField>();
  public form: FormGroup;
  private componentDestroyed$: Subject<any> = new Subject();

  public cards$: Observable<Array<IBankCard>> = this.store.select(selectPaymentMetods);
  public billingEmail$: Observable<string> = this.store.select(selectbillingEmail);
  public formData$ = this.store.select(selectAccountSettingsFormData);
  public isLoading$ = this.store.select(selecFormLoading);
  public currentTab$ = this.store.select(selectAccountSettingsTab);

  constructor(private store: Store<IAccountSettingsState>) {
    this.initFormFieldMap();
    this.initForm();
    this.form.disable();
    this.initFormData();
    this.formData$.subscribe(data => (this.updateFormData(data), this.form.enable()));
  }

  public onTabChanged(tab: MatTabChangeEvent) {
    this.store.dispatch(selectTabAction({ tab: tab.index }));
  }

  public onSubmit(formValue: any) {
    this.form.disable();

    const valueToSend: IAccountSettingsForm = {
      id: formValue,
      company_name: formValue.company_name,
      company_email_address: formValue.contact_email_address,
      full_address: formValue.address,
      street_1: formValue.street_1,
      street_2: formValue.street_2,
      suite: formValue.suite_number,
      city: formValue.city,
      postal_code: formValue.postal_code,
      state: formValue.state,
      country: formValue.country,
    };
    this.store.dispatch(AccountSettingsActions.upateAction(
      { result: valueToSend, params: formValue.id } as ResultState<IAccountSettingsForm, string>
    ));
  }

  public onLocationSelected(result: PlaceResult) {
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
      this.form.patchValue({ [AccountSettingsFormControl.street_1]: str });
    } else {
      this.form.patchValue({ [AccountSettingsFormControl.street_1]: formattedAddressName });
    }
    this.form.patchValue({ [AccountSettingsFormControl.city]: (city) ? city.long_name : '' });
    this.form.patchValue({ [AccountSettingsFormControl.street_2]: '' });
    this.form.patchValue({ [AccountSettingsFormControl.suite_number]: '' });
    this.form.patchValue({ [AccountSettingsFormControl.state]: (state) ? state.long_name : '' });
    this.form.patchValue({ [AccountSettingsFormControl.postal_code]: (postalCode) ? postalCode.long_name : '' });
    this.form.patchValue({ [AccountSettingsFormControl.country]: (country) ? country.long_name : '' });
  }

  private initFormData() {
    this.store.dispatch(AccountSettingsActions.infoAction());
  }

  private updateFormData(formData) {
    this.form.patchValue({
      [AccountSettingsFormControl.company_name]: formData.company_name,
      [AccountSettingsFormControl.contact_email_address]: formData.contact_email_address,
      [AccountSettingsFormControl.id]: formData.id
    });

    if (formData.address) {
      this.form.patchValue({
        [AccountSettingsFormControl.address]: formData.address.full_adddress,
        [AccountSettingsFormControl.street_1]: formData.address.street_1,
        [AccountSettingsFormControl.street_2]: formData.address.street_2,
        [AccountSettingsFormControl.city]: formData.address.city,
        [AccountSettingsFormControl.suite_number]: formData.address.suite,
        [AccountSettingsFormControl.postal_code]: formData.address.postal_code,
        [AccountSettingsFormControl.state]: formData.address.state,
        [AccountSettingsFormControl.country]: formData.address.country,
      });
    }

  }

  public clearAll() {
    this.initForm();
  }

  private initForm() {
    this.form = new FormGroup({
      [AccountSettingsFormControl.company_name]: new FormControl(null, Validators.required),
      [AccountSettingsFormControl.contact_email_address]: new FormControl(),
      [AccountSettingsFormControl.id]: new FormControl(),
      [AccountSettingsFormControl.street_1]: new FormControl(null, Validators.required),
      [AccountSettingsFormControl.street_2]: new FormControl(),
      [AccountSettingsFormControl.address]: new FormControl(),
      [AccountSettingsFormControl.state]: new FormControl(null, Validators.required),
      [AccountSettingsFormControl.city]: new FormControl(null, Validators.required),
      [AccountSettingsFormControl.postal_code]: new FormControl(),
      [AccountSettingsFormControl.suite_number]: new FormControl(),
      [AccountSettingsFormControl.country]: new FormControl(null, Validators.required)
    });

    listenForFormFieldErrors(
      AccountSettingsFormControl,
      this.fieldMap,
      this.form
    ).pipe(takeUntil(this.componentDestroyed$)).subscribe();
  }

  private initFormFieldMap() {
    this.fieldMap.set(
      AccountSettingsFormControl.company_name,
      new InputFormField({
        formControlName: AccountSettingsFormControl.company_name,
        label: 'Company Name',
        placeholder: 'Company Name',
        errorMap: CompanyNameErrorsMap,
        requiredLabel: true,
      }));
    this.fieldMap.set(
      AccountSettingsFormControl.contact_email_address,
      new InputFormField({
        formControlName: AccountSettingsFormControl.contact_email_address,
        label: '', placeholder: '', visible: false
      }));
    this.fieldMap.set(
      AccountSettingsFormControl.id,
      new InputFormField({
        formControlName: AccountSettingsFormControl.id,
        label: '', placeholder: '', visible: false
      }));
    this.fieldMap.set(
      AccountSettingsFormControl.address,
      new InputFormField({
        formControlName: AccountSettingsFormControl.address,
        label: 'Address', placeholder: 'Address', visible: false
      }));
    this.fieldMap.set(
      AccountSettingsFormControl.street_1,
      new InputFormField({
        formControlName: AccountSettingsFormControl.street_1,
        label: 'Address', placeholder: 'Address', icon: 'address',
        errorMap: AddressErrorsMap,
        requiredLabel: true,
      }));
    this.fieldMap.set(
      AccountSettingsFormControl.street_2,
      new InputFormField({
        formControlName: AccountSettingsFormControl.street_2,
        label: 'Address 2', placeholder: 'Address 2', icon: 'address',
      }));
    this.fieldMap.set(
      AccountSettingsFormControl.city,
      new InputFormField({
        formControlName: AccountSettingsFormControl.city,
        label: 'City', placeholder: 'City', icon: 'city', class: 'col-md-6 pl-md-0 pr-px-12',
        errorMap: CityErrorsMap,
        requiredLabel: true
      }));
    this.fieldMap.set(
      AccountSettingsFormControl.state,
      new InputFormField({
        formControlName: AccountSettingsFormControl.state,
        label: 'State/Province', placeholder: 'State/Province', icon: 'state', class: 'col-md-6 pr-md-0 pl-px-12',
        errorMap: StateErrorsMap,
        requiredLabel: true
      }));
    this.fieldMap.set(
      AccountSettingsFormControl.suite_number,
      new InputFormField({
        formControlName: AccountSettingsFormControl.suite_number,
        label: 'Suite Number', placeholder: 'Suite Number', class: 'col-md-6 pl-md-0 pr-px-12',
      }));
    this.fieldMap.set(
      AccountSettingsFormControl.postal_code,
      new InputFormField({
        formControlName: AccountSettingsFormControl.postal_code,
        label: 'Postal Code', placeholder: 'Postal Code', icon: 'postal-code', class: 'col-md-6 pr-md-0 pl-px-12',
      }));

    this.fieldMap.set(
      AccountSettingsFormControl.country,
      new AutocompleteFormField({
        formControlName: AccountSettingsFormControl.country,
        label: 'Country', visible: true, options: optionsFromArray(COUNTRIES),
        errorMap: CountryErrorsMap,
        requiredLabel: true
      }));
  }

  ngOnDestroy() {
    this.componentDestroyed$.next();
    this.componentDestroyed$.complete();
  }

}
