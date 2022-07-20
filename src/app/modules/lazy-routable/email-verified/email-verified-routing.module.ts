
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { USER_PROFILE_ROUTES } from './constants';

@NgModule({
  imports: [
    RouterModule.forChild(USER_PROFILE_ROUTES)
  ],
  exports: [
    RouterModule
  ]
})
export class EmailVerifiedRoutingModule { }
