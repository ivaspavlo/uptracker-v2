
import { Routes } from '@angular/router';
import { CanDeactivateGuard } from '@app/core/guards';
import { UserProfileContainerComponent } from '../container/user-profile-container.component';

export enum USER_PROFILE_ROUTE_NAMES { BLANK = '' }

export const USER_PROFILE_ROUTES: Routes = [{
  path: USER_PROFILE_ROUTE_NAMES.BLANK,
  component: UserProfileContainerComponent,
  canDeactivate: [CanDeactivateGuard]
}];
