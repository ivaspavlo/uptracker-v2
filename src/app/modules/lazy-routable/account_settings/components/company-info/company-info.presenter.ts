import { IFormField, IOption } from '@app/interfaces';
import { FormControlType } from '@app/shared/constants';
import { AccountSettingsFormControl } from '../../constants/account-settings-form-control';
import { FormGroup } from '@angular/forms';
import PlaceResult = google.maps.places.PlaceResult;
import { Subject, Observable } from 'rxjs';

export class CompanyInfoPresenter {

  private locationSelected = new Subject<PlaceResult>();
  public locationSelected$: Observable<PlaceResult> = this.locationSelected.asObservable();

  private formSubmitted = new Subject<any>();
  public formSubmitted$: Observable<any> = this.formSubmitted.asObservable();

  private clearForm = new Subject<any>();
  public clearForm$: Observable<any> = this.clearForm.asObservable();


  public onFormSubmit(value): void {
    this.formSubmitted.next(value);
  }

  public clearAll(): void {
    this.clearForm.next();
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

  public isCheckboxControlVisible(field: IFormField): boolean {
    return field.visible && field.formControlType === FormControlType.Checkbox;
  }

  public isInputWithAutocomplete(field: IFormField): boolean {
    return field.visible && field.formControlName === AccountSettingsFormControl.street_1;
  }

  public isInputTypeAutocomplete(field: IFormField): boolean {
    return field.visible && field.formControlType === FormControlType.Autocomplete;
  }

}
