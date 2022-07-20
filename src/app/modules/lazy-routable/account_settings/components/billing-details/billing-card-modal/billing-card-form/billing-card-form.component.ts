
import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, EventEmitter, Output, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { BillingCardFormFormControl } from '../../../../constants/billing-card-form-control';
import { IFormField, IOption, IStripeErrorMessage } from '@app/interfaces';
import { BillingCardPresenter } from './billing-card-form.presenter';
import PlaceResult = google.maps.places.PlaceResult;

import { LoadingState } from '@app/shared/constants';

@Component({
  providers: [BillingCardPresenter],
  selector: 'app-billing-card-form',
  templateUrl: './billing-card-form.component.html',
  styleUrls: ['./billing-card-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BillingCardFormComponent implements OnInit, OnDestroy {

  @Input() isFormLoading: boolean;
  @Input() title: string;
  @Input() form: FormGroup;
  @Input() loading$: Observable<LoadingState>;
  @Output() formSubmit: EventEmitter<any> = new EventEmitter();
  @Output() locationSelected: EventEmitter<PlaceResult> = new EventEmitter();
  @Output() closeModal: EventEmitter<any> = new EventEmitter();
  @Input() fieldMap: Map<BillingCardFormFormControl, IFormField>;
  @Input() stripeErrors: IStripeErrorMessage;

  private componentDestroyed$: Subject<any> = new Subject();

  constructor(public presenter: BillingCardPresenter) { }

  public ngOnInit(): void {
    this.presenter.emitValue<void>(this.presenter.onClose$, this.closeModal);
    this.presenter.emitValue<PlaceResult>(this.presenter.locationSelected$, this.locationSelected);
    this.presenter.emitValue<any>(this.presenter.formSubmitted$, this.formSubmit);
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next();
    this.componentDestroyed$.complete();
  }
}
