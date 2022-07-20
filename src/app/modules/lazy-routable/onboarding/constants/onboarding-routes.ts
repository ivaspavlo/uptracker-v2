
import { Routes } from '@angular/router';
import { OnboardingContainerComponent } from '../container/onboarding-container.component';

export enum ONBOARDING_ROUTE_NAMES { BLANK = '' }

export const ONBOARDING_ROUTES: Routes = [{
  path: ONBOARDING_ROUTE_NAMES.BLANK,
  component: OnboardingContainerComponent
}];
