import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@app/shared/shared.module';

import { MATERIAL_MODULES } from '../../constants/material-modules';
import { BillingHistoryComponent } from './billing-history/billing-history.component';
import { BillingCardComponent } from './billing-card/billing-card.component';
import { BillingDetailsComponent } from './billing-details.component';

import { TelInputModule, BtnPanelModule } from '@app/modules/ui-elements';
import { BillingCardModalComponent } from './billing-card-modal/billing-card-modal.component';
import { BillingCardFormComponent } from './billing-card-modal/billing-card-form/billing-card-form.component';
import { ProgressBarModule } from '@app/modules/ui-elements';

@NgModule({
  declarations: [
    BillingDetailsComponent,
    BillingCardComponent,
    BillingCardFormComponent,
    BillingHistoryComponent,
    BillingCardModalComponent
  ],
  imports: [
    ...MATERIAL_MODULES,
    CommonModule,
    SharedModule,
    TelInputModule,
    BtnPanelModule
  ],
  exports: [
    BillingDetailsComponent
  ]
})
export class BillingDetailsModule { }
