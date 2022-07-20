
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DASHBOARD_ROUTES } from './constants';

@NgModule({
  imports: [
    RouterModule.forChild(DASHBOARD_ROUTES)
  ],
  exports: [
    RouterModule
  ]
})
export class DashboardRoutingModule { }
