
import { Component, OnInit, ChangeDetectionStrategy, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { IAccountPlan } from '@app/interfaces';
import { IApplyPromoRes } from '../../services/onboarding.service';

@Component({
  selector: 'app-onboarding-plans',
  templateUrl: './onboarding-plans.component.html',
  styleUrls: ['./onboarding-plans.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OnboardingPlansComponent implements OnInit {

  @Input() plans: IAccountPlan[];
  @Input() set promo(value: IApplyPromoRes) {
    this._promo = value;
    if (!this.promoCtrl) { return; }
    (value && value.valid) ? this.promoCtrl.setErrors(null) : this.promoCtrl.setErrors({ invalidPromo: true });
  }
  get promo() { return this._promo; }

  @Output() stepComplete: EventEmitter<boolean> = new EventEmitter();
  @Output() planChange: EventEmitter<{ plan: IAccountPlan; qty?: number; }> = new EventEmitter();
  @Output() applyPromo: EventEmitter<{ string }> = new EventEmitter();

  public form: FormGroup;
  public promoCtrl: AbstractControl;

  private PROMO_CTRL_NAME = 'promo';
  private currentPlan: IAccountPlan;
  private _promo: IApplyPromoRes;

  constructor() { }

  ngOnInit(): void {
    this.form = new FormGroup({ [this.PROMO_CTRL_NAME]: new FormControl() });
    this.promoCtrl = this.form.get(this.PROMO_CTRL_NAME);
  }

  public onPlanChange(res: { plan: IAccountPlan; }): void {
    if (!this.currentPlan) { this.stepComplete.emit(true); }
    this.currentPlan = res.plan;
    this.planChange.emit(res);
  }

  public onQtyChange(res: { plan: IAccountPlan; qty: number; }): void {
    this.planChange.emit(res);
  }

}
