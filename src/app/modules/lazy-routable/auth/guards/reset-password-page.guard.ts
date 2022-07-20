
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';

import { Observable, of } from 'rxjs';
import { first, map, switchMap } from 'rxjs/operators';

import { ICoreModuleState } from '@app/core/store';
import { ACTION_TYPES, validateResetTokenAction } from '@app/core/store/actions/auth.actions';
import { selectUserPasswordResetData } from '@app/core/store/selectors/user.selector';
import { PASSWORD_RESET_TOKEN_KEY } from '@app/shared/constants';

@Injectable()
export class ResetPasswordPageGuard implements CanActivate {

  constructor(
    private store: Store<ICoreModuleState>,
    private actions$: Actions
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const req = { [PASSWORD_RESET_TOKEN_KEY]: route.params[PASSWORD_RESET_TOKEN_KEY] };
    this.store.dispatch(validateResetTokenAction(req));
    return this.actions$.pipe(
      ofType(ACTION_TYPES.VALIDATE_RESET_TOKEN_SUCCESS, ACTION_TYPES.VALIDATE_RESET_TOKEN_FAILURE),
      first(),
      map((res: { type: string }) => res.type === ACTION_TYPES.VALIDATE_RESET_TOKEN_SUCCESS),
      switchMap((isValidToken: boolean) => {
        return isValidToken ?
          this.store.pipe(first(), select(selectUserPasswordResetData), map(res => res && !!res.user_id)) : of(false);
      })
    );
  }

}
