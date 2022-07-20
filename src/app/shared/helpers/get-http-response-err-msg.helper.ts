
import { HttpErrorResponse } from '@angular/common/http';

import { DEFAULT_ERROR_MSG } from '../constants';
import { get } from './get.helper';

export const getHttpResponseErrorMsg = (err: HttpErrorResponse, defaultErrMsg = DEFAULT_ERROR_MSG): string => {
  return get(err, 'error.error_message') ?? defaultErrMsg;
};
