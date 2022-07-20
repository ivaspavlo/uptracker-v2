
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'objectValues'
})
export class ObjectValuesPipe implements PipeTransform {
  transform<T>(val: { [key: string]: T }): T[] {
    return Object.keys(val).reduce((acc, key) => {
      return [ ...acc, val[key] ];
    }, []);
  }
}
