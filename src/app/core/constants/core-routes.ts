
import { Routes } from '@angular/router';
import { RoutePermitData } from '@app/shared/models';
import { CorePageComponent } from '../components';
import { AuthGuard, OnboardingGuard, PermissionGuard } from '../guards';
import { PERMIT_FEATURE_NAMES } from './permit-feature-names';


export enum CORE_ROUTE_NAMES {
  BLANK = '',
  DASHBOARD = 'dashboard',
  ACCOUNT_SETTINGS = 'account_settings',
  USER_PROFILE = 'profile',
  USER_MANAGEMENT = 'management',
  ONBOARDING = 'onboarding',
  LOCATIONS = 'locations',
  AUTH = 'auth',
  EMAIL_VERIFIED = 'email_verified/:email_verification_token',
  OTHER = '**',
  NOT_FOUND = '404'
}

export const CORE_ROUTES: Routes = [
  {
    path: CORE_ROUTE_NAMES.AUTH,
    loadChildren: () => import('@app/modules/lazy-routable/auth/auth.module').then(m => m.AuthModule)
  }, {
    path: CORE_ROUTE_NAMES.EMAIL_VERIFIED,
    loadChildren: () => import('@app/modules/lazy-routable/email-verified/email-verified.module').then(m => m.EmailVerifiedModule)
  }, {
    path: CORE_ROUTE_NAMES.BLANK,
    component: CorePageComponent,
    children: [
      {
        path: CORE_ROUTE_NAMES.BLANK,
        pathMatch: 'full',
        redirectTo: CORE_ROUTE_NAMES.DASHBOARD
      }, {
        path: CORE_ROUTE_NAMES.DASHBOARD,
        loadChildren: () => import('@app/modules/lazy-routable/dashboard/dashboard.module').then(m => m.DashboardModule),
        canLoad: [ AuthGuard, OnboardingGuard ],
        canActivate: [ AuthGuard, OnboardingGuard ]
      }, {
        path: CORE_ROUTE_NAMES.ACCOUNT_SETTINGS,
        loadChildren: () => import('@app/modules/lazy-routable/account_settings/account-settings.module').then(m => m.AccountSettingsModule),
        canLoad: [ AuthGuard, OnboardingGuard ],
        canActivate: [ AuthGuard, OnboardingGuard ]
      }, {
        path: CORE_ROUTE_NAMES.USER_PROFILE,
        loadChildren: () => import('@app/modules/lazy-routable/user-profile/user-profile.module').then(m => m.UserProfileModule),
        canLoad: [ AuthGuard, OnboardingGuard ],
        canActivate: [ AuthGuard, OnboardingGuard ]
      }, {
        path: CORE_ROUTE_NAMES.USER_MANAGEMENT,
        loadChildren: () => import('@app/modules/lazy-routable/user-management/user-management.module').then(m => m.UserManagementModule),
        data: new RoutePermitData(PERMIT_FEATURE_NAMES.user_management),
        canLoad: [ AuthGuard, OnboardingGuard, PermissionGuard ],
        canActivate: [ AuthGuard, OnboardingGuard, PermissionGuard ]
      }, {
        path: CORE_ROUTE_NAMES.ONBOARDING,
        loadChildren: () => import('@app/modules/lazy-routable/onboarding/onboarding.module').then(m => m.OnboardingModule),
        canLoad: [ AuthGuard ],
        canActivate: [ AuthGuard ]
      }, {
        path: CORE_ROUTE_NAMES.LOCATIONS,
        loadChildren: () => import('@app/modules/lazy-routable/locations/locations.module').then(m => m.LocationsModule),
        canLoad: [ AuthGuard, OnboardingGuard ],
        canActivate: [ AuthGuard, OnboardingGuard ]
      }, {
        path: CORE_ROUTE_NAMES.OTHER,
        pathMatch: 'full',
        redirectTo: CORE_ROUTE_NAMES.NOT_FOUND,
      }, {
        path: CORE_ROUTE_NAMES.NOT_FOUND,
        loadChildren: () => import('@app/modules/lazy-routable/not-found/not-found.module').then(m => m.NotFoundModule),
        canLoad: [ AuthGuard ],
        canActivate: [ AuthGuard ]
      }
    ]
  }
];
