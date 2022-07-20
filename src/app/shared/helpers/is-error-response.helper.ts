
import { CALL_STATE_KEY } from '../constants';

export const isErrorResponse = (res: any): boolean => {
  return CALL_STATE_KEY in res;
};
