
import { Component, OnInit, ChangeDetectionStrategy, EventEmitter, Output, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { map, first, skip } from 'rxjs/operators';

import { IPaymentMethod, IStripeError, IStripeFailureRes } from '@app/interfaces';
import { get } from '@app/shared/helpers';
import { StripeErrorParamTypes } from '@app/shared/constants';

@Component({
  selector: 'app-onboarding-billing',
  templateUrl: './onboarding-billing.component.html',
  styleUrls: ['./onboarding-billing.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OnboardingBillingComponent implements OnInit {

  @Input() isLoading: boolean;
  @Input() set paymentData(paymentData: { payment_methods: IPaymentMethod[]; stripe_error: IStripeFailureRes; }) {
    this.stepComplete.emit(!!get(paymentData, 'payment_methods.length'));
    this._paymentData$.next(paymentData);
  }

  @Output() cardSave: EventEmitter<any> = new EventEmitter();
  @Output() stepComplete: EventEmitter<boolean> = new EventEmitter();

  public cardForm: FormGroup;
  public currentCard$: Observable<IPaymentMethod>;
  public stripeError$: Observable<IStripeError>;
  public stripeErrorMsg$: Observable<string>;

  private _paymentData$: Subject<{ payment_methods: IPaymentMethod[]; stripe_error: IStripeFailureRes; }> = new Subject();
  private CARD_NUMBER_ERROR_MSG = 'Card number is incorrect.';
  private EXP_DATE_ERROR_MSG = 'Expiry date is incorrect';
  private CVV_ERROR_MSG = 'CVV is incorrect';
  private DEFAULT_CARD_ERROR_MSG = 'Please check the card form';

  constructor() { }

  ngOnInit(): void {
    this.initCurrentCardObservable();
    this.initStripeCardErrorObservable();
    this.initStripeErrorMsgObservable();
  }

  public onSubmit(): void {
    this.cardSave.emit(this.cardForm.value);
    this.resetFormIfNoError();
  }

  private initCurrentCardObservable(): void {
    this.currentCard$ = this._paymentData$.pipe(map((paymentData: { payment_methods: IPaymentMethod[]; stripe_error: IStripeFailureRes; }) =>
      paymentData && paymentData.payment_methods ? paymentData.payment_methods.slice(-1).pop() : null));
  }

  private initStripeCardErrorObservable(): void {
    this.stripeError$ = this._paymentData$.pipe(map((paymentData: { payment_methods: IPaymentMethod[]; stripe_error: IStripeFailureRes; }) => get(paymentData, 'stripe_error') || null));
  }

  private initStripeErrorMsgObservable(): void {
    this.stripeErrorMsg$ = this.stripeError$.pipe(map((res: IStripeError) => {
      if (!res) { return null; }
      switch (res.param) {
        case StripeErrorParamTypes.exp_month:
        case StripeErrorParamTypes.exp_year: { return this.EXP_DATE_ERROR_MSG; }
        case StripeErrorParamTypes.number: { return this.CARD_NUMBER_ERROR_MSG; }
        case StripeErrorParamTypes.cvc: { return this.CVV_ERROR_MSG; }
        default: { return this.DEFAULT_CARD_ERROR_MSG; }
      }
    }));
  }

  private resetFormIfNoError(): void {
    this._paymentData$.pipe(
      skip(1),
      first()
    ).subscribe(({ stripe_error }: { payment_methods: IPaymentMethod[]; stripe_error: IStripeFailureRes; }) => {
      if (!stripe_error) { this.cardForm.reset(); }
    });
  }

}
