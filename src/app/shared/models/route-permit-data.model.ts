
import { IRoutePermitData } from '@app/interfaces';

export class RoutePermitData implements IRoutePermitData {

  permit_feature: string;

  constructor(permit_feature: string) {
    this.permit_feature = permit_feature;
  }

}
