import { IFormField, IOption } from '@app/interfaces';
import { FormControlType } from '@app/shared/constants';

import { FormGroup } from '@angular/forms';
import PlaceResult = google.maps.places.PlaceResult;
import { Subject, Observable } from 'rxjs';
import { BillingCardFormFormControl } from '../../../../constants/billing-card-form-control';
import { EventEmitter } from '@angular/core';

export class BillingCardPresenter {

  private locationSelected = new Subject<PlaceResult>();
  public locationSelected$: Observable<PlaceResult> = this.locationSelected.asObservable();

  private formSubmitted = new Subject<any>();
  public formSubmitted$: Observable<any> = this.formSubmitted.asObservable();

  private onClose = new Subject<void>();
  public onClose$: Observable<any> = this.onClose.asObservable();


  public onFormSubmit(value): void {
    this.formSubmitted.next(value);
  }

  public onModalClose(): void {
    this.onClose.next();
  }

  public onLocationSelected(result: PlaceResult): void {
    this.locationSelected.next(result);
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
    return field.visible && field.formControlName === BillingCardFormFormControl.address;
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

}
