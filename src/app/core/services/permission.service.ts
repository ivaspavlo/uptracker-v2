
import { Injectable } from '@angular/core';
import { IHasPermitReq, IFeaturePermitSettings } from '@app/interfaces';
import { UserService } from '@app/core/services/user.service';
import { PERMIT_FEATURE_NAME } from '@app/core/constants';


@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  constructor(private userService: UserService) { }

  // PUBLIC METHODS

  public hasFeaturePermit(permit_feature: PERMIT_FEATURE_NAME): boolean {
    const role = this.userService.getRoleFromStorage();
    const result =
      role &&
      role.permissions &&
      role.permissions[permit_feature] &&
      (role.permissions[permit_feature] as IFeaturePermitSettings).enabled;
    return result;
  }

  public hasActionPermit({ permit_feature, action }: IHasPermitReq): boolean {
    const role = this.userService.getRoleFromStorage();
    return this.hasFeaturePermit(permit_feature) && this.getActionPermit( this.getFeaturePermitSettings(role, permit_feature), action );
  }

  // PRIVATE METHODS

  private getFeaturePermitSettings(role, permit_feature: PERMIT_FEATURE_NAME): IFeaturePermitSettings {
    return role ? role.permissions[permit_feature] : null;
  }

  private getActionPermit(permitSettings, action: string): boolean {
    const permit = permitSettings ? permitSettings.actions.find(a => a[action]) : null;
    return permit ? permit[action] : false;
  }

}
