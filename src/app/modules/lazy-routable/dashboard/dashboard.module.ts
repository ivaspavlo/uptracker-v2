
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MATERIAL_MODULES } from '@app/shared/constants';
import { SharedModule } from '@app/shared/shared.module';

import { DASHBOARD_COMPONENTS } from './components';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './container/dashboard.component';

@NgModule({
  declarations: [
    DashboardComponent,
    ...DASHBOARD_COMPONENTS
  ],
  imports: [
    CommonModule,
    SharedModule,
    DashboardRoutingModule,
    ...MATERIAL_MODULES
  ],
  exports: [
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
