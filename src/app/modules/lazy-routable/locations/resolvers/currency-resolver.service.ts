
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, skip, first } from 'rxjs/operators';

import { ICurrency } from '@app/interfaces';
import { getCurrenciesAction } from '@app/core/store/actions/core-page.actions';
import { selectCurrencies } from '@app/core/store/selectors';

@Injectable() export class CurrencyResolver implements Resolve<any> {

  constructor(private store: Store) { }

  resolve(): Observable<ICurrency[]> {
    this.store.dispatch(getCurrenciesAction());
    return this.store.select(selectCurrencies).pipe(
      skip(1),
      filter(res => !!res),
      first()
    );
  }

}
