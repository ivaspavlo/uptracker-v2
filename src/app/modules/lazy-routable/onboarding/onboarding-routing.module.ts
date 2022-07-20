
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ONBOARDING_ROUTES } from './constants';

@NgModule({
  imports: [
    RouterModule.forChild(ONBOARDING_ROUTES)
  ],
  exports: [
    RouterModule
  ]
})
export class OnboardingRoutingModule { }
