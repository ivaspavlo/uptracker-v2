
import { ValidatorFn, FormGroup } from '@angular/forms';
import { MUST_MATCH_ERROR_NAME } from '@app/shared/constants';

export const mustMatchValidator = (ctrlName: string, matchCtrlName: string): ValidatorFn => {
  return (fg: FormGroup): { [MUST_MATCH_ERROR_NAME]: boolean } | null => {
    const ctrl = fg.get(ctrlName);
    const matchCtrl = fg.get(matchCtrlName);
    if(!ctrl || !matchCtrl || ctrl.value === matchCtrl.value) { return null; }
    return { [MUST_MATCH_ERROR_NAME]: true };
  };
}
