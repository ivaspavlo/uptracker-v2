
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CORE_ROUTES } from './constants/core-routes';
import { AuthGuard, CanDeactivateGuard, OnboardingGuard, PermissionGuard } from './guards';

@NgModule({
  imports: [
    RouterModule.forRoot(CORE_ROUTES)
  ],
  providers: [
    AuthGuard,
    CanDeactivateGuard,
    OnboardingGuard,
    PermissionGuard
  ],
  exports: [
    RouterModule
  ]
})
export class CoreRoutingModule { }
