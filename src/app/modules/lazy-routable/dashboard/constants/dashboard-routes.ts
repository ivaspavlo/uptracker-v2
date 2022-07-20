
import { Routes } from '@angular/router';

import { DashboardComponent } from '../container/dashboard.component';

export enum DASHBOARD_ROUTE_NAMES {
  BLANK = ''
}

export const DASHBOARD_ROUTES: Routes = [{
  path: DASHBOARD_ROUTE_NAMES.BLANK,
  children: [
    {
      path: DASHBOARD_ROUTE_NAMES.BLANK,
      pathMatch: 'full',
      component: DashboardComponent
    }
  ]
}];
