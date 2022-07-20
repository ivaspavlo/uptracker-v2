
import { PERMIT_FEATURE_NAME } from '@app/core/constants';


export interface IRole {
  role: string;
  permissions: { [key: string]: IFeaturePermitSettings; };
  locations: string[];
  role_id: string;
  status: string;
}

export interface IFeaturePermitSettings {
  enabled: boolean;
  actions: { [key: string]: boolean; }[];
}

export interface IHasPermitReq {
  permit_feature: PERMIT_FEATURE_NAME;
  action: string;
}

export interface IRoutePermitData {
  permit_feature: string;
}
