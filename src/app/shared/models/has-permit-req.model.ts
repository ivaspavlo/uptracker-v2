
import { IHasPermitReq } from '@app/interfaces';
import { PERMIT_FEATURE_NAME } from '@app/core/constants';

export class HasPermitReq implements IHasPermitReq {

  permit_feature: PERMIT_FEATURE_NAME;
  action: string;

  constructor([ permit_feature, action ]: [ PERMIT_FEATURE_NAME, string ]) {
    this.permit_feature = permit_feature;
    this.action = action;
  }

}
