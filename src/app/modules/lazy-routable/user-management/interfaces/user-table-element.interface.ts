
export interface IUserTableElement {
  id: string;
  avatar: string;
  name: string;
  email_address: string;
  role: string;
  locations: string[];
  locations_table_name: string;
  tab_name: string;
  invite_token?: string;
}
