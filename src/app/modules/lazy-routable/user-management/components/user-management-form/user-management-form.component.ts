
import { Component, Input } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { EmailInputErrorsMap } from '@app/shared/constants';

@Component({
  selector: 'app-user-management-form',
  templateUrl: './user-management-form.component.html'
})
export class UserManagementFormComponent {

  @Input() form: FormGroup;
  @Input() ctrls: { [key: string]: AbstractControl };
  @Input() ctrlNames;
  @Input() data;

  public emailErrorsMap = EmailInputErrorsMap;

}
