
import { FormGroup } from '@angular/forms';

export const getPasswordInputErrorMsg = (formGroup: FormGroup, ctrlName: string): () => string => {
  return () => {
    const ctrl = formGroup ? formGroup.get(ctrlName) : null;
    if (!ctrl || !Object.keys(ctrl.errors).length ) { return; }
    if (ctrl.hasError('required')) { return 'Password is required'; }
    if (ctrl.hasError('minlength')) { return 'Password must contain at least 8 symbols'; }
  }
}
