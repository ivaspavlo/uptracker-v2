
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AUTH_ROUTES } from './constants';
import { ResetPasswordPageGuard } from './guards';

@NgModule({
  imports: [
    RouterModule.forChild(AUTH_ROUTES)
  ],
  providers: [
    ResetPasswordPageGuard
  ],
  exports: [
    RouterModule
  ]
})
export class AuhRoutingModule { }
