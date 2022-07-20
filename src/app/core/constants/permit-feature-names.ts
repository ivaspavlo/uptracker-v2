
export enum PERMIT_FEATURE_NAMES {
  account_settings = 'account_settings',
  global_marketplace = 'global_marketplace',
  global_vendors = 'global_vendors',
  location_management = 'location_management',
  my_marketplace = 'my_marketplace',
  my_vendors = 'my_vendors',
  orders = 'orders',
  shopping_list = 'shopping_list',
  user_management = 'user_management',
  products = 'products'
}

export type PERMIT_FEATURE_NAME = keyof PERMIT_FEATURE_NAMES;
