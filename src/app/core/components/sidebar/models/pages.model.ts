
import { PERMIT_FEATURE_NAMES } from '@app/core/constants/permit-feature-names';
import { INavigation } from '../interfaces';

export const PAGES_LIST: Array<INavigation> = [
  { name: 'Dashboard', permit_feature: null, route: '/onboarding', icon: 'speedometer-default', iconActive: 'speedometer-active', active: false },
  { name: 'Marketplace', permit_feature: PERMIT_FEATURE_NAMES.global_marketplace, route: '#', icon: 'marketplace-default', iconActive: 'marketplace-active', active: true },
  { name: 'Orders', permit_feature: PERMIT_FEATURE_NAMES.orders, route: '#', icon: 'orders-default', iconActive: 'orders-active', active: false },
  { name: 'Reports', permit_feature: null, route: '#', icon: 'reports', iconActive: 'reports-active', active: false }
];

export const ADMIN_PAGES_LIST: Array<INavigation> = [
  { name: 'User Management', permit_feature: PERMIT_FEATURE_NAMES.user_management, route: '/management', icon: 'user-management', iconActive: 'user-management-active', active: false },
  { name: 'Locations Management', permit_feature: PERMIT_FEATURE_NAMES.location_management, route: '/locations', icon: 'locations-management', iconActive: 'locations-management-active', active: false },
  { name: 'Account Settings', permit_feature: PERMIT_FEATURE_NAMES.account_settings, route: '/account_settings', icon: 'account-settings', iconActive: 'account-settings-active', active: false }
];
