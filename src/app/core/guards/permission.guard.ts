
import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, ActivatedRouteSnapshot, Route } from '@angular/router';
import { Observable } from 'rxjs';
import { PermissionService } from '@app/core/services';


@Injectable()
export class PermissionGuard implements CanActivate, CanLoad {

  constructor(private permissionService: PermissionService) { }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    return this.permissionService.hasFeaturePermit(route.data.permit_feature);
  }

  canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
    return this.permissionService.hasFeaturePermit(route.data.permit_feature);
  }

}
