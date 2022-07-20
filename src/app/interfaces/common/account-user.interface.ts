
export interface IAccountUser {
  id: string;
  name: string;
  email_address: string;
  avatar: string;
  role: string;
  default_location_id: string;
  department: string;
  status: string;
  [key: string]: any;
}
