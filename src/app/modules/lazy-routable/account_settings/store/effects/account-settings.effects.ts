
import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';

import { map, switchMap, tap } from 'rxjs/operators';

import * as AccountSettingsActions from '../actions/account-settings.actions';

import { AccountService } from '@app/core/services';
import { IAccountSettingsForm } from '../../interfaces';
import { ResultState } from '../../interfaces/result-state.interface';
import { ToasterService } from '@app/core/services';
import { ToastTypes, ToastPosition } from '@app/shared/constants';
import { ACC_SETTINGS_UPDATED, TOAST_DURATION } from '../../constants';
import { effectsResponseHandler, showResultStateErrorOperator } from '@app/shared/helpers';

@Injectable()
export class AccountSettingsEffects {

  constructor(
    private actions$: Actions,
    private toasterService: ToasterService,
    private accountService: AccountService,
  ) { }

  @Effect()
  accountsInfo$ = this.actions$.pipe(
    ofType(AccountSettingsActions.ACTION_TYPES.ACCOUNT_SETTINGS_INFO),
    switchMap(() => {
      return this.accountService.getAccount()
      .pipe(
        effectsResponseHandler,
        showResultStateErrorOperator(this.toasterService),
        map(data => AccountSettingsActions.successAction(data))
      );
    })
  );



  @Effect()
  companyInfoUpdate$ = this.actions$.pipe(
    ofType(AccountSettingsActions.ACTION_TYPES.ACCOUNT_SETTINGS_COMPANY_INFO_UPDATE),
    switchMap((state: ResultState<IAccountSettingsForm, string>) => {
      return this.accountService.updateAccountSettingsInfo(state.params, state.result)
      .pipe(
        map(data => AccountSettingsActions.successAction(data)),
        tap(_ => {
          this.toasterService.pop(
            ACC_SETTINGS_UPDATED, ToastTypes.success, TOAST_DURATION, ToastPosition.right, ToastPosition.bottom);
        })
      );
    })
  );

}
