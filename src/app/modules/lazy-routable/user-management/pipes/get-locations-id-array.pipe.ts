
import { Pipe, PipeTransform } from '@angular/core';
import { ILocation } from '@app/interfaces';

@Pipe({
  name: 'getLocationsIdArray'
})
export class GetLocationsIdArrayPipe implements PipeTransform {

  transform(value: ILocation[]): string[] {
    return value.map(l => l.id);
  }

}
