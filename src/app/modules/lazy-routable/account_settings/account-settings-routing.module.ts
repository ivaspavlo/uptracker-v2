
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ACCOUNT_SETTINGS_ROUTES } from './constants';

@NgModule({
  imports: [
    RouterModule.forChild(ACCOUNT_SETTINGS_ROUTES)
  ],
  exports: [
    RouterModule
  ]
})
export class AccountSettingsRoutingModule { }
