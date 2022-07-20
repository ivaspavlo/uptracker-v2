
import { Pipe, PipeTransform } from '@angular/core';
import { get, capitalize } from '@app/shared/helpers';
import { ILocation, IInvitedUser, IAccountUser } from '@app/interfaces';
import { IUserTableElement } from '../interfaces';

@Pipe({
  name: 'formatUsersTableData'
})
export class FormatUsersTableDataPipe implements PipeTransform {

  transform(
    users: [IAccountUser | IInvitedUser][],
    tab_name: string,
    allLocations: ILocation[]
  ): IUserTableElement[] | null {
    if (!users) { return null; }
    return users.map((user: any) => ({
      ...user,
      tab_name,
      name: user.name || user.invited_by_name,
      role: this.getRole(user),
      locations: this.getPermittedLocations(user),
      locations_table_name: this.mapLocation(this.getPermittedLocations(user), allLocations),
      invite_token: user.invite_token || null
    }));
  }

  private mapLocation(permittedLocations: string[], allLocations: ILocation[]): string {
    return permittedLocations.length === allLocations.length ?
      'All locations' : `${permittedLocations.length} ${ permittedLocations.length === 1 ? 'location' : 'locations' }`;
  }

  private getPermittedLocations(user: IAccountUser | IInvitedUser): string[] {
    return get(user, 'permissions.locations') || get(user, 'locations') || [];
  }

  private getRole(user: IAccountUser | IInvitedUser): string {
    return capitalize(get(user, 'permissions.role') || user.role);
  }

}
