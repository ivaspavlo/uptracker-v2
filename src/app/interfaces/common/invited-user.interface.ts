
export interface IInvitedUser {
  id: string;
  name: string;
  invited_by_name: string;
  email_address: string;
  locations: string[];
  role: string;
  status: string;
  invite_token: string;
  [key: string]: any;
}
