
import { CallState, ErrorState } from '../constants';

export const getError = (callState: CallState): string | null => { 
  if ((callState as ErrorState).errorMsg !== undefined) { 
    return (callState as ErrorState).errorMsg;
  }
  return null;
}
