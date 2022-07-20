
import { HttpErrorResponse } from '@angular/common/http';

import { of} from 'rxjs';
import { catchError} from 'rxjs/operators';

import { ToasterService } from '@app/core/services';
import { ToastTypes } from '../constants';
import { getHttpResponseErrorMsg } from './get-http-response-err-msg.helper';

export const httpErrorHandler = (toasterService: ToasterService) => (customErrMsg?: string) => {
  return catchError((err: HttpErrorResponse) => {
    const errorMsg = customErrMsg || getHttpResponseErrorMsg(err);
    toasterService && toasterService.pop(errorMsg, ToastTypes.error);
    return of({ result: null, callState: { errorMsg } });
  });
};
