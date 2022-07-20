
import { Observable } from 'rxjs';
import { ILocation, IRole } from '@app/interfaces';
import { IUserTableElement } from './user-table-element.interface';

export interface IUserManagementModal {
  locations: ILocation[];
  roles: IRole[];
  emailIsUsed$: Observable<boolean>;
  title: string;
  user?: IUserTableElement;
}

export interface IUserManagementModalRes {
  id: string;
  email_address: string;
  role: string;
  locations: string[];
  name: string;
}

export interface IEditInviteModalRes extends IUserManagementModalRes {
  invite_token: string;
}
