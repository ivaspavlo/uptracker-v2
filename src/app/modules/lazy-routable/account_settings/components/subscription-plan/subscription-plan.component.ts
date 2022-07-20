
import { Component, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { ISubscriptionPlanState, IAccountSettingsForm } from '../../interfaces';

import { getSubscriptionPlans, getSubscription, cancelSubscriptionPlan } from '../../store/actions/subscription-plan.actions';
import { selecSubscriptionPlans, selecSubscription } from '../../store/selectors/subscription-plans.selector';
import { IAccountPlan } from '@app/interfaces/common';
import { IApplyPromoRes } from '@app/interfaces/features';
import { SubscriptionPlanPresenter } from './subscription-plan.presenter';
import { Router } from '@angular/router';
import { map, first, filter, take } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { CancelSubModalComponent } from '../cancel-sub-modal/cancel-sub-modal.component';
import { DIALOG_SIZES } from '@app/shared/constants';
import { ICancelAccountReq } from '@app/core/services';
import { selectAccountSettingsFormData } from '../../store/selectors';

@Component({
  selector: 'app-subscription-plan',
  templateUrl: './subscription-plan.component.html',
  styleUrls: ['./subscription-plan.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [SubscriptionPlanPresenter]
})
export class SubscriptionPlanComponent implements OnInit, OnDestroy {

  public plan$: Observable<IAccountPlan> = this.presenter.combine(this.store.select(selecSubscriptionPlans), this.store.select(selecSubscription));
  public promo$: Observable<IApplyPromoRes> = this.plan$.pipe(filter(p => p.promo_code.active || p.promo_code.valid), map(plan => plan.promo_code));
  private accout$: Observable<IAccountSettingsForm> = this.store.select(selectAccountSettingsFormData);
  private destroy$ = new Subject<void>();

  constructor(
    private store: Store<ISubscriptionPlanState>,
    private presenter: SubscriptionPlanPresenter,
    private dialog: MatDialog,
    private route: Router) { }

  public ngOnInit(): void {
    this.store.dispatch(getSubscriptionPlans());
    this.store.dispatch(getSubscription());
  }

  public onCancelPlan(plan: IAccountPlan): void {
    this.dialog.open(CancelSubModalComponent, { width: DIALOG_SIZES.MD, data: { date: plan.end } })
      .afterClosed().pipe(
        first(), filter(req => !!req)
      ).subscribe((data: ICancelAccountReq | null) => {
        this.accout$.pipe(take(1)).subscribe(acc => {
          this.store.dispatch(cancelSubscriptionPlan({ id: acc.id, data }));
        });
      });
  }

  public onChangePlan(plan: IAccountPlan): void {
    this.route.navigateByUrl('/account_settings/edit_subscription');
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
