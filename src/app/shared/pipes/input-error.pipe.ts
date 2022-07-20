
import { Pipe, PipeTransform } from '@angular/core';
import { DefaultInputErrorsMap } from '../constants';

@Pipe({
  name: 'inputError'
})
export class InputErrorPipe implements PipeTransform {
  transform(errors: {[key: string]: string}, errorsMap: Map<string, string> = DefaultInputErrorsMap): string {
    if (errors && errorsMap.size > 0) {
      const [errorKey] = Object.keys(errors);
      return errorsMap.has(errorKey) ? errorsMap.get(errorKey) : errorKey;
    }
  }
}
