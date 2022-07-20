
import { AbstractControl } from '@angular/forms';

export const getErrorMsg = (
  ctrl: AbstractControl,
  errorsMap: Map<string, string>
): () => string => {
  return () => {
    if (ctrl.errors && errorsMap.size > 0) {
      const [errorKey] = Object.keys(ctrl.errors);
      return errorsMap.has(errorKey) ? errorsMap.get(errorKey) : errorKey;
    }
  }
}
