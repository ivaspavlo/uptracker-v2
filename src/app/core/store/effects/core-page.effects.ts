
import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';

import { ConfigService } from '@app/core/services';
import { effectsResponseHandler } from '@app/shared/helpers';
import { ResultState } from '@app/shared/constants';
import { IRole, ICurrency } from '@app/interfaces';
import * as CorePageActions from '../actions/core-page.actions';


@Injectable()
export class CorePageEffects {

  constructor(
    private actions$: Actions,
    private configService: ConfigService
  ) { }

  getRoles$ = createEffect((): any => this.actions$.pipe(
    ofType(CorePageActions.ACTION_TYPES.GET_ROLES),
    switchMap(_ => this.configService.getRoles()
      .pipe(
        effectsResponseHandler,
        map((payload: ResultState<IRole[] | null>) => {
          return payload.result ?
            CorePageActions.getRolesSuccessAction(payload) :
            CorePageActions.getRolesFailureAction();
        })
      ))
  ));

  getCurrencies = createEffect((): any => this.actions$.pipe(
    ofType(CorePageActions.ACTION_TYPES.GET_CURRENCIES),
    switchMap(_ => this.configService.getCurrencies()
      .pipe(
        effectsResponseHandler,
        map((payload: ResultState<ICurrency[] | null>) => {
          return payload.result ?
            CorePageActions.getCurrenciesSuccessAction(payload) :
            CorePageActions.getCurrenciesFailureAction();
        })
      )
    )
  ));

}
