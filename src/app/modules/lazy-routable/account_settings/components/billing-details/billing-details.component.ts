
import { Component, ChangeDetectionStrategy, OnInit, OnDestroy, Input } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { IBankCard } from '../../interfaces/bank-card.interface';
import { Store } from '@ngrx/store';
import { IBillingDetailsState, IBillingHistoryResponce } from '../../interfaces';
import { selectBillingDetailsHistory, selecBillingHistoryTableLoading, selecBillingCardFormLoading, selecBillingCardFormVisible, selectBillingCardFormError } from '../../store/selectors';
import * as BillingDetailsActions from '../../store/actions/billing-details.actions';
import * as AccountSettingsActions from '../../store/actions/account-settings.actions';
import { CallState, LoadingState, CANCEL_UPPER_CASE, OK_UPPER_CASE } from '@app/shared/constants';
import { map, filter, takeUntil, take } from 'rxjs/operators';
import { MatDialogRef } from '@angular/material/dialog';
import { BillingCardModalComponent } from './billing-card-modal/billing-card-modal.component';
import { IBillingCard } from '@app/interfaces';
import { REMOVE_CARD, REMOVE_CARD_QUESTION, SET_CARD_ACTIVE_QUESTION, SET_CARD_ACTIVE, UPDATE_BILLING_EMAIL_QUESTION, UPDATE_BILLING_EMAIL, ADD_CARD, EDIT_CARD } from '../../constants';
import { FormControl, Validators } from '@angular/forms';
import { BillingDetailsPresenter } from './billing-details.presenter';


@Component({
  selector: 'app-billing-details',
  templateUrl: './billing-details.component.html',
  styleUrls: ['./billing-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [BillingDetailsPresenter]
})
export class BillingDetailsComponent implements OnInit, OnDestroy {

  @Input() cards$: Observable<IBankCard[]>;
  @Input() email$: Observable<string>;

  public billingEmail: string;
  public history$: Observable<IBillingHistoryResponce> = this.store.select(selectBillingDetailsHistory);
  public historyLoadnigState$: Observable<CallState> = this.store.select(selecBillingHistoryTableLoading);
  public billingCardFormLoadnigState$: Observable<CallState> = this.store.select(selecBillingCardFormLoading);
  public billingCardFormVisible$: Observable<boolean> = this.store.select(selecBillingCardFormVisible);
  public billingCardFormError$: Observable<any> = this.store.select(selectBillingCardFormError);
  public canLoadMore$: Observable<boolean> = this.history$
    .pipe(map(hist => (hist.count / this.currentHistoryPage) > this.HISTORY_LIMIT_PER_PAGE));
  public emailFormControl: FormControl;
  public isButtonLoadMoreVidible: boolean;

  private destroy$ = new Subject<void>();
  private HISTORY_LIMIT_PER_PAGE = 10;
  private currentHistoryPage = 1;
  private dialogRef: MatDialogRef<BillingCardModalComponent>;

  constructor(
    private presenter: BillingDetailsPresenter,
    private store: Store<IBillingDetailsState>) { }

  ngOnInit(): void {
    this.loadHistoryList();
    this.canLoadMore$.pipe(take(2)).subscribe(canLoad => this.isButtonLoadMoreVidible = canLoad);

    this.email$.pipe(takeUntil(this.destroy$)).subscribe((email: string) => {
      this.emailFormControl = new FormControl(email, [
        Validators.required,
        Validators.email,
      ]);
    });
  }

  private loadHistoryList(): void {
    this.store.dispatch(BillingDetailsActions.getHistoryAction({ page: this.currentHistoryPage }));
  }

  public onCardSetActive(card: IBankCard): void {
    this.presenter.openInfoModal({
      titles: [SET_CARD_ACTIVE, SET_CARD_ACTIVE_QUESTION],
      btnNames: [CANCEL_UPPER_CASE, OK_UPPER_CASE]
    }).pipe(filter(v => v), takeUntil(this.destroy$)).subscribe(_ => {
      this.store.dispatch(BillingDetailsActions.setActiveCardAction({ id: card.id }));
    });
  }

  public onEmailFormSubmit(email: string) {
    this.presenter.openInfoModal({
      titles: [UPDATE_BILLING_EMAIL, UPDATE_BILLING_EMAIL_QUESTION],
      btnNames: [CANCEL_UPPER_CASE, OK_UPPER_CASE]
    }).pipe(filter(v => v), takeUntil(this.destroy$)).subscribe(_ => {
      this.store.dispatch(BillingDetailsActions.updateBillingEmailAction({ email }));
    });
  }

  public onAddCard(): void {
    this.store.dispatch(BillingDetailsActions.clearBillingCardFormErrorsAction());
    this.dialogRef = this.presenter.getCardAddDialog(this.billingCardFormLoadnigState$, this.billingCardFormError$);

    this.dialogRef.afterOpened().subscribe(_ => {
      this.dialogRef.componentInstance.formData$.subscribe((c: IBillingCard) => {
        this.store.dispatch(BillingDetailsActions.addBillingCardsAction(c));
        this.billingCardFormVisible$.pipe(filter(visible => !visible), takeUntil(this.destroy$))
          .subscribe(_ => {
            this.store.dispatch(AccountSettingsActions.infoAction());
            this.store.dispatch(BillingDetailsActions.clearBillingCardFormErrorsAction());
            this.dialogRef.close();
          });
      });
    });
  }

  public onCardEdit(card: IBankCard): void {
    this.store.dispatch(BillingDetailsActions.clearBillingCardFormErrorsAction());
    this.dialogRef = this.presenter.getCardEditDialog(card, this.billingCardFormLoadnigState$);

    this.dialogRef.afterOpened().subscribe(_ => {
      this.dialogRef.componentInstance.formData$
        .pipe(takeUntil(this.destroy$)).subscribe((c: IBillingCard) => {
          this.store.dispatch(BillingDetailsActions.editBillingCardAction(c));
          this.billingCardFormVisible$.pipe(filter(visible => !visible), takeUntil(this.destroy$))
            .subscribe(_ => (this.store.dispatch(AccountSettingsActions.infoAction()), this.dialogRef.close()));
        });
    });
  }

  public onCardDelete(card: IBankCard): void {
    this.presenter.openInfoModal({
      titles: [REMOVE_CARD, REMOVE_CARD_QUESTION],
      btnNames: [CANCEL_UPPER_CASE, OK_UPPER_CASE]
    }).pipe(filter(v => v)).subscribe(_ => {
      this.store.dispatch(BillingDetailsActions.deleteBillingCardAction({ id: card.id }));
    });
  }

  public loadMore() {
    this.currentHistoryPage += 1;
    this.loadHistoryList();
  }

  public isLoading(): Observable<boolean> {
    return this.historyLoadnigState$.pipe(map((state: CallState) => state === LoadingState.LOADING));
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.currentHistoryPage = 1;
    this.store.dispatch(BillingDetailsActions.clearHistoryAction());
  }
}
