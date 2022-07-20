import { FormControl, ValidationErrors } from '@angular/forms';

export function createTelInputValidator() {
  return function validateTelInput(c: FormControl): ValidationErrors {
    return  (c.value.phone_number) ? null : { required: true };
  };
}
