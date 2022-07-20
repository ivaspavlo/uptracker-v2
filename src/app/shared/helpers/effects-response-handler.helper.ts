
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ResultState, LoadingState } from '../constants';
import { getHttpResponseErrorMsg } from './get-http-response-err-msg.helper';

export const effectsResponseHandler = (source: Observable<any>): Observable<ResultState<any>> => {
  return source.pipe(
    catchError((err: HttpErrorResponse) => of({ result: null, callState: { errorMsg: getHttpResponseErrorMsg(err) } })),
    map((result: any) => isErrorResponse(result) ? result : { result, callState: LoadingState.LOADED })
  );
};

const isErrorResponse = (res: any): boolean => {
  return res && res.callState && res.callState.hasOwnProperty('errorMsg');
};
