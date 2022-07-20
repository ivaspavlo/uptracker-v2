
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ToasterService } from '@app/core/services/toaster.service';
import { ToastTypes, ResultState } from '@app/shared/constants';
import { get } from './get.helper';

export const showResultStateMsgOperator = (
  { service, error, success }: { service: ToasterService, error?: string; success?: string; }
) => (source: Observable<ResultState<any>>): Observable<ResultState<any>> => {
  return source.pipe(
    tap((res: ResultState<any>) => {
      const httpErrorMsg = get(res, 'callState.errorMsg');
      if (httpErrorMsg) { return service.pop(error || (httpErrorMsg.message ? httpErrorMsg.message : httpErrorMsg), ToastTypes.error); }
      if (success) { return service.pop(success, ToastTypes.success); }
    })
  );
};
