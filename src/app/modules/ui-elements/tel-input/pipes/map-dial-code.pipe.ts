
import { Pipe, PipeTransform } from '@angular/core';

import { UptrackerCountryCodes } from '../models';

@Pipe({
  name: 'mapDialCode'
})
export class MapDialCodePipe implements PipeTransform {
  transform(dialCode: string): string {
    const currCode = Object.keys(UptrackerCountryCodes).find(key => UptrackerCountryCodes[key].dial_code === dialCode);
    return currCode ? UptrackerCountryCodes[currCode].code : '';
  }
}
