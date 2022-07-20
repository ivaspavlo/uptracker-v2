
import { Observable } from 'rxjs';

export interface CanComponentDeactivate {
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

export type CanDeactivateResponse = Observable<boolean> | Promise<boolean> | boolean;
