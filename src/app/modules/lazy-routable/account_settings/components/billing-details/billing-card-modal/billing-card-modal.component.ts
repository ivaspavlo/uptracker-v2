
import { Component, OnInit, ChangeDetectionStrategy, Inject, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subject, Observable } from 'rxjs';
import { takeUntil, skip, tap, filter } from 'rxjs/operators';
import { BillingCardFormFormControl, EditBillingCardFormFormControl } from '../../../constants/billing-card-form-control';
import { IFormField, IStripeErrorMessage } from '@app/interfaces';
import { listenForFormFieldErrors } from '@app/shared/utils';
import { BillingCardModalPresenter } from './billing-card-modal.presenter';
import PlaceResult = google.maps.places.PlaceResult;
import { IBankCard, IBillingDetailsState } from '../../../interfaces';
import { LoadingState } from '@app/shared/constants';

import * as BillingDetailsActions from '../../../store/actions/billing-details.actions';

import { hasCardNumberErrors, hasExpDateErrors, hasCvcErrors } from '@app/shared/helpers';
import { Store } from '@ngrx/store';


@Component({
  providers: [BillingCardModalPresenter],
  selector: 'app-billing-card-modal',
  templateUrl: './billing-card-modal.component.html',
  styleUrls: ['./billing-card-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BillingCardModalComponent implements OnInit, OnDestroy {

  public fieldMap = new Map<BillingCardFormFormControl, IFormField>();
  public form: FormGroup;
  public title: string;
  public formData$: Subject<any> = new Subject();
  public loading$: Observable<LoadingState>;
  public errors$: Observable<IStripeErrorMessage>;

  private isEdit: boolean;
  private componentDestroyed$: Subject<any> = new Subject();

  constructor(
    private store: Store<IBillingDetailsState>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private presenter: BillingCardModalPresenter,
    public dialogRef: MatDialogRef<BillingCardModalComponent>,
    private cdr: ChangeDetectorRef
  ) { }

  public ngOnInit(): void {
    this.title = this.data.title;
    this.isEdit = this.data.edit;
    this.errors$ = this.data.errors$;
    this.loading$ = this.data.loading$;

    this.initFormFieldMap(this.isEdit);
    this.initForm(this.data.card || null);

    if (!this.isEdit) {
      this.listenStripeErrors(this.form);
      this.cleanBackendErorrsFromField('exp_date');
      this.cleanBackendErorrsFromField('cvv');
      this.cleanBackendErorrsFromField('card_number');
    }
  }

  private cleanBackendErorrsFromField(fieldName: string) {
    this.form.get(fieldName).valueChanges.subscribe(_ => {
      if (this.form.get(fieldName).hasError('stripe-error')) {
        this.form.get(fieldName).setErrors({ 'stripe-error': null });
        this.form.get(fieldName).updateValueAndValidity();
      }
    });
  }

  public onLocationSelected(result: PlaceResult): void {
    this.presenter.onLocationSelected(result, this.form);
  }

  public onSubmit(val): void {
    this.formData$.next(val);
  }

  private listenStripeErrors(control: FormGroup) {
    this.errors$.pipe(
      filter(err => !!err),
      tap(err => {
        if (hasCardNumberErrors(err)) { control.get('card_number').setErrors({ 'stripe-error': true }); }
        if (hasExpDateErrors(err)) { control.get('exp_date').setErrors({ 'stripe-error': true }); }
        if (hasCvcErrors(err)) { control.get('cvv').setErrors({ 'stripe-error': true }); }
      })
    ).subscribe();
  }

  public closeModal(): void {
    this.dialogRef.close();
    this.store.dispatch(BillingDetailsActions.clearBillingCardFormErrorsAction());
  }

  private initForm(card: IBankCard = null) {
    this.form = this.presenter.getForm(
      card,
      this.isEdit);
    listenForFormFieldErrors(
      (this.isEdit) ? EditBillingCardFormFormControl : BillingCardFormFormControl,
      this.fieldMap,
      this.form
    ).pipe(takeUntil(this.componentDestroyed$)).subscribe();
  }

  private initFormFieldMap(isEdit) {
    this.fieldMap = this.presenter.getFormFieldMap(isEdit);
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next();
    this.componentDestroyed$.complete();
  }
}
