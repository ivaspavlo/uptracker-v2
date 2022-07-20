
export const UserManagementTableHeaders = [
  'person',
  'email_address',
  'role',
  'locations',
  'tab_name'
];

export enum UserManagementTabs {
  'active' = 'Users',
  'invited' = 'User Invites',
  'archived' = 'Archived'
}

export enum AccountUserStatuses {
  'active' = 'active',
  'archived' = 'archived',
  'pending' = 'pending'
}
