
import { IInvite } from '@app/interfaces';

export class Invite implements IInvite {
  email_address: string;
  role = 'user';
  locations: [];
  name = null;

  constructor(email_address: string) {
    this.email_address = email_address;
  }
}
