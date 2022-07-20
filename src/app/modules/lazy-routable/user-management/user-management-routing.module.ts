
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { USER_MANAGEMENT_ROUTES } from './constants';

@NgModule({
  imports: [
    RouterModule.forChild(USER_MANAGEMENT_ROUTES)
  ],
  exports: [
    RouterModule
  ]
})
export class UserManagementRoutingModule { }
