

import { Subject, Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { BillingCardModalComponent } from './billing-card-modal/billing-card-modal.component';
import { DIALOG_SIZES } from '@app/shared/constants';
import { EDIT_CARD, ADD_CARD } from '../../constants';
import { IBankCard } from '../../interfaces';
import { IInfoModalData, InfoModalComponent } from '@app/modules/non-lazy-routable';
import { Injectable } from '@angular/core';

@Injectable()
export class BillingDetailsPresenter {

  constructor(private dialog: MatDialog){}

  public getCardEditDialog(card: IBankCard, loadingState$: Observable<any>): any {
    return this.dialog.open(BillingCardModalComponent,
      {
        maxWidth: DIALOG_SIZES.MD, autoFocus: false,
        data: {
          title: EDIT_CARD,
          edit: true, card,
          loading$: loadingState$
        }
      });
  }

  public getCardAddDialog(loadingState$: Observable<any>,  billingCardFormError$: Observable<any>): any {
    return this.dialog.open(BillingCardModalComponent,
      {
        maxWidth: DIALOG_SIZES.MD, autoFocus: false,
        data: {
          title: ADD_CARD,
          edit: false,
          loading$: loadingState$,
          errors$: billingCardFormError$
        }
      });
  }

  public openInfoModal(data: IInfoModalData): Observable<any> {
    return this.dialog.open(
      InfoModalComponent,
      { width: DIALOG_SIZES.MD, data }
    ).afterClosed();
  }



}
