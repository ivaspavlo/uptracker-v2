
import { FormGroup, FormControl, Validators } from '@angular/forms';

export class UserProfileContainerPresenter {

  public initForm({
    name,
    email_address,
    default_location_id,
    phone_number,
    department,
    country_code,
    avatar
  }): FormGroup {
    return new FormGroup({
      name: new FormControl(name || null, Validators.required),
      email_address: new FormControl(email_address || null, Validators.required),
      default_location_id: new FormControl(default_location_id || null),
      department: new FormControl(department || null),
      country_code: new FormControl(country_code || null),
      avatar: new FormControl(avatar || null),
      phone_number: new FormControl(phone_number || null)
    });
  }

  public getControls(UserProfileFormCtrlNames, form: FormGroup): any {
    return {
      [UserProfileFormCtrlNames.name]: form.get(UserProfileFormCtrlNames.name),
      [UserProfileFormCtrlNames.email_address]: form.get(UserProfileFormCtrlNames.email_address),
      [UserProfileFormCtrlNames.default_location_id]: form.get(UserProfileFormCtrlNames.default_location_id),
      [UserProfileFormCtrlNames.phone_number]: form.get(UserProfileFormCtrlNames.phone_number),
      [UserProfileFormCtrlNames.department]: form.get(UserProfileFormCtrlNames.department),
      [UserProfileFormCtrlNames.country_code]: form.get(UserProfileFormCtrlNames.country_code),
      [UserProfileFormCtrlNames.avatar]: form.get(UserProfileFormCtrlNames.avatar),
    };
  }

}
