
import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

import { MUST_MATCH_ERROR_NAME } from '@app/shared/constants';

export class PasswordsMatchErrorMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const hasError = form && form.hasError(MUST_MATCH_ERROR_NAME);
    return control &&
      (hasError || control.invalid) &&
        (control.dirty || control.touched);
  }
}
