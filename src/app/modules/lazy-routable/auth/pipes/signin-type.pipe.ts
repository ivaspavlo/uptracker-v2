
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'signinInputType'
})
export class SigninInputTypePipe implements PipeTransform {
  transform(inputType: string, showPwd = false): string {
    if (inputType === 'password') { return showPwd ? 'text' : 'password'; }
    return inputType;
  }
}
