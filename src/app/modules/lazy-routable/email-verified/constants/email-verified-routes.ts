
import { Routes } from '@angular/router';
import { EmailVerifiedComponent } from '../container/email-verified.component';

export enum EMAIL_VERIFIED_ROUTE_NAMES { BLANK = '' }

export const USER_PROFILE_ROUTES: Routes = [{
  path: EMAIL_VERIFIED_ROUTE_NAMES.BLANK,
  component: EmailVerifiedComponent
}];
