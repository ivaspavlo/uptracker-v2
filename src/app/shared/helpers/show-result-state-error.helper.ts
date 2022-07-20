
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ToastTypes, ResultState } from '@app/shared/constants';
import { get } from './get.helper';

export const showResultStateErrorOperator = (toasterService, customErrMsg?: string) =>
(source: Observable<ResultState<any>>): Observable<ResultState<any>> => {
  return source.pipe(
    tap((res: ResultState<any>) => {
      const errMsg = get(res, 'callState.errorMsg');
      if (errMsg) { toasterService.pop(customErrMsg || errMsg, ToastTypes.error); }
    })
  );
};
