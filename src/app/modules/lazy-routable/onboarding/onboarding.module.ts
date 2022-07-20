
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '@app/shared/shared.module';
import { ProgressBarModule, AccountPlansModule, TelInputModule, AddLocationFormModule, CloseModalBtnModule, BtnPanelModule } from '@app/modules/ui-elements';

import { COMPONENTS } from './components';
import { ONBOARDING_FEATURE_NAME } from './constants';
import { OnboardingRoutingModule } from './onboarding-routing.module';
import { OnboardingEffects } from './store/effects/onboarding.effects';
import * as onboardingReducer from './store/reducers/onboarding.reducer';

@NgModule({
  declarations: [
    ...COMPONENTS
  ],
  imports: [
    CommonModule,
    SharedModule,
    ProgressBarModule,
    AccountPlansModule,
    TelInputModule,
    AddLocationFormModule,
    CloseModalBtnModule,
    BtnPanelModule,
    OnboardingRoutingModule,
    StoreModule.forFeature(ONBOARDING_FEATURE_NAME, onboardingReducer.reducer),
    EffectsModule.forFeature([OnboardingEffects]),
  ]
})
export class OnboardingModule { }
