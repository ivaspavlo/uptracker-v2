
import { Routes } from '@angular/router';
import { UserManagementComponent } from '../container/user-management.component';

export enum USER_MANAGEMENT_ROUTE_NAMES { BLANK = '' }

export const USER_MANAGEMENT_ROUTES: Routes = [{
  path: USER_MANAGEMENT_ROUTE_NAMES.BLANK,
  component: UserManagementComponent
}];
