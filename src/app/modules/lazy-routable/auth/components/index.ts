
import { LoginComponent } from './login/login.component';
import { SigninComponent } from './signin/signin.component';
import { ForgotComponent } from './forgot/forgot.component';
import { ResetComponent } from './reset/reset.component';
import { AuthHeaderComponent } from './auth-header/auth-header.component';

export * from './login/login.component';
export * from './forgot/forgot.component';
export * from './reset/reset.component';
export * from './signin/signin.component';
export * from './auth-header/auth-header.component';

export const AUTH_COMPONENTS = [
  LoginComponent,
  ForgotComponent,
  ResetComponent,
  SigninComponent,
  AuthHeaderComponent
];
