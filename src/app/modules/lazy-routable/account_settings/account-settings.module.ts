
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '@app/shared/shared.module';
import { AccountPlansModule, AddLocationFormModule, BtnPanelModule, ModalHeaderModule } from '@app/modules/ui-elements';

import { AccountSettingsRoutingModule } from './account-settings-routing.module';
import { AccountSettingsEffects, BillingDetailsEffects, SubscriptionPlansEffects } from './store/effects';
import { MATERIAL_MODULES, ACCOUNT_SETTINGS_COMPONENTS } from './constants';
import { BillingDetailsModule } from './components/billing-details/billing-details.module';

import * as accountSettingsReducer from './store/reducers/account-settings.reducer';
import * as billingDetailsReducer from './store/reducers/billing-details.reducer';
import * as subscriptionPlanReducer from './store/reducers/subscription-plan.reducer';


@NgModule({
  declarations: [
    ACCOUNT_SETTINGS_COMPONENTS
  ],
  imports: [
    ...MATERIAL_MODULES,
    SharedModule,
    CommonModule,
    BillingDetailsModule,
    AccountSettingsRoutingModule,
    AccountPlansModule,
    AddLocationFormModule,
    BtnPanelModule,
    ModalHeaderModule,
    StoreModule.forFeature('subscriptionPlan', subscriptionPlanReducer.reducer),
    StoreModule.forFeature('accountSettings', accountSettingsReducer.reducer),
    StoreModule.forFeature('billingDetails', billingDetailsReducer.reducer),
    EffectsModule.forFeature([AccountSettingsEffects, BillingDetailsEffects, SubscriptionPlansEffects])
  ],
  exports: [
    BillingDetailsModule,
    AccountSettingsRoutingModule
  ]
})
export class AccountSettingsModule { }
