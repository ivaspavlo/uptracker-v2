
import { Routes } from '@angular/router';

import { LoginComponent, SigninComponent, ForgotComponent, ResetComponent } from '../components';
import { AuthContainerComponent } from '../container/auth-container.component';
import { ResetPasswordPageGuard } from '../guards';

export enum AUTH_ROUTE_NAMES {
  BLANK = '',
  SIGNIN = 'signin',
  LOGIN = 'login',
  FORGOT = 'forgot',
  RESET = 'reset/:password_reset_token'
}

export const AUTH_ROUTES: Routes = [{
  path: AUTH_ROUTE_NAMES.BLANK,
  component: AuthContainerComponent,
  children: [
    {
      path: AUTH_ROUTE_NAMES.BLANK,
      pathMatch: 'full',
      redirectTo: AUTH_ROUTE_NAMES.LOGIN
    }, {
      path: AUTH_ROUTE_NAMES.LOGIN,
      component: LoginComponent
    }, {
      path: AUTH_ROUTE_NAMES.FORGOT,
      component: ForgotComponent
    }, {
      path: AUTH_ROUTE_NAMES.RESET,
      component: ResetComponent,
      canActivate: [ResetPasswordPageGuard]
    }, {
      path: AUTH_ROUTE_NAMES.SIGNIN,
      component: SigninComponent
    }
  ]
}];
