import { IAccountPlan, ISubscription } from '@app/interfaces/common';
import { Observable, combineLatest } from 'rxjs';
import { map, filter, skip, tap } from 'rxjs/operators';
import { FormGroup, FormControl, AbstractControl, Validators } from '@angular/forms';
import { ChangeAccountPlanModalComponent } from '../change-account-plan-modal/change-account-plan-modal.component';
import { DIALOG_SIZES } from '@app/shared/constants';
import { MatDialog } from '@angular/material/dialog';
import { IApplyPromoRes } from '@app/interfaces';


export class SubscriptionPlanPresenter {

  private PROMO_CTRL_NAME = 'promo';

  public combine(subscriptionPlans$: Observable<IAccountPlan[]>, subscription$: Observable<ISubscription>): Observable<IAccountPlan> {
    return combineLatest([subscriptionPlans$, subscription$])
      .pipe(
        filter(data => !!data[0] && !!data[1]),
        map((data) => this.combinePlans(data[0], data[1])));
  }

  public openDialog(dialog: MatDialog, oldPlan: IAccountPlan, newPlan: IAccountPlan, promo: IApplyPromoRes = null): Observable<any> {
    return dialog.open(ChangeAccountPlanModalComponent, { width: DIALOG_SIZES.XS, data: { old: oldPlan, new: newPlan, promo } })
      .afterClosed().pipe(filter(confirmed => !!confirmed));
  }

  public getForm(): FormGroup {
    return new FormGroup({ [this.PROMO_CTRL_NAME]: new FormControl(null, Validators.required) });
  }

  public getPromoCtrl(form: FormGroup): AbstractControl {
    return form.get(this.PROMO_CTRL_NAME);
  }

  public getPromoFromPlan(plan: IAccountPlan): IApplyPromoRes {
    return (plan.promo_code.valid || plan.promo_code.active) ? plan.promo_code : null;
  }

  public extendPlan(oldPlan: IAccountPlan, newPlan: IAccountPlan): IAccountPlan {
    return {
      ...newPlan,
      additional_location_qty: oldPlan.additional_location_qty,
      additional_location_price: oldPlan.additional_location_price
    };
  }

  public isSelectedCurrentPlan(plan$: Observable<IAccountPlan>, selectedPlan$: Observable<IAccountPlan>): Observable<boolean> {
    return combineLatest([plan$, selectedPlan$])
      .pipe(filter(plans => !!(plans[0] && !!plans[1])), map(plans => plans[0].id === plans[1].id));
  }

  public getPlans(subscriptionPlans$: Observable<IAccountPlan[]>, subscription$: Observable<ISubscription>): Observable<IAccountPlan[]> {
    return combineLatest([subscriptionPlans$, subscription$])
      .pipe(
        filter(plans => !!(plans[0] && !!plans[1])),
        map(plans => plans[0].map(p => ({ ...p, additional_location_qty: plans[1].additional_location_qty }))));
  }

  public combinePlans(plans: IAccountPlan[], subscription: ISubscription): IAccountPlan {
    return { ...plans.find(p => p.id === subscription.id), ...subscription };
  }

}
