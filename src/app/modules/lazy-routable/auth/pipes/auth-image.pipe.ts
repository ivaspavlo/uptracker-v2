
import { Pipe, PipeTransform } from '@angular/core';
import { AUTH_ROUTE_NAMES } from '../constants/auth-routes';

@Pipe({
  name: 'authImage'
})
export class AuthImagePipe implements PipeTransform {
  transform(currentUrl: string): string {
    switch (currentUrl) {
      case AUTH_ROUTE_NAMES.SIGNIN:
      case AUTH_ROUTE_NAMES.LOGIN: { return '/assets/img/svg/auth-1.svg'; }
      case AUTH_ROUTE_NAMES.FORGOT:
      case null: { return '/assets/img/svg/auth-2.svg'; }
    }
  }
}
