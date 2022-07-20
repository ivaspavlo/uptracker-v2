
import { Routes } from '@angular/router';

import { AccountSettingsComponent } from '../container/account-settings.component';
import { EditSubscriptionPlanComponent } from '../components/subscription-plan/edit-subscription-plan/edit-subscription-plan.component';

export enum ACCOUNT_SETTINGS_ROUTE_NAMES {
  BLANK = '',
  EDIT_SUBSCRIPTION_PLAN = 'edit_subscription',
}

export const ACCOUNT_SETTINGS_ROUTES: Routes = [{
  path: ACCOUNT_SETTINGS_ROUTE_NAMES.BLANK,
  children: [
    {
      path: ACCOUNT_SETTINGS_ROUTE_NAMES.BLANK,
      pathMatch: 'full',
      component: AccountSettingsComponent
    },
    {
      path: ACCOUNT_SETTINGS_ROUTE_NAMES.EDIT_SUBSCRIPTION_PLAN,
      pathMatch: 'full',
      component: EditSubscriptionPlanComponent,
    }
  ]
}];
