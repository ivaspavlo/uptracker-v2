
import { Component, ChangeDetectionStrategy, OnInit, OnDestroy, Inject } from '@angular/core';
import { Subject, Observable, combineLatest, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { ISubscriptionPlanState, IChangeAccountPlanModal } from '../../../interfaces';
import { selecSubscriptionPlans, selecSubscription, seletSelectedPlan, seletStateLoading, seletErrors, seletPromoCodeApplied } from '../../../store/selectors/subscription-plans.selector';
import { SubscriptionPlanPresenter } from '../subscription-plan.presenter';
import { IAccountPlan } from '@app/interfaces/common';
import { getSubscriptionPlans, getSubscription, selectPlan, setSubscriptionPlanPromo, checkSubscriptionPlanPromo } from '../../../store/actions/subscription-plan.actions';
import { takeUntil, take, filter, map, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CallState } from '@app/shared/constants';
import { IApplyPromoRes } from '@app/interfaces';
import { WINDOW } from '@app/core/constants/tokens';

@Component({
  selector: 'app-edit-subscription-plan',
  templateUrl: './edit-subscription-plan.component.html',
  styleUrls: ['./edit-subscription-plan.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [SubscriptionPlanPresenter]
})
export class EditSubscriptionPlanComponent implements OnInit, OnDestroy {

  public form: FormGroup;
  public promoCtrl: AbstractControl;
  public plans$: Observable<IAccountPlan[]> = this.presenter.getPlans(this.store.select(selecSubscriptionPlans), this.store.select(selecSubscription));
  public currentPlan$: Observable<IAccountPlan> = this.presenter.combine(this.plans$, this.store.select(selecSubscription)).pipe(take(1));
  public promo$: Observable<IApplyPromoRes> = this.currentPlan$.pipe(filter(p => p.promo_code.active || p.promo_code.valid), map(plan => plan.promo_code));
  public errors$: Observable<any> = this.store.select(seletErrors);
  public isPromoApplied$: Observable<boolean> = this.store.select(seletPromoCodeApplied);
  public selectedPlan$: Observable<IAccountPlan> = this.store.select(seletSelectedPlan);
  public isSelectedCurrentPlan$ = this.presenter.isSelectedCurrentPlan(this.currentPlan$, this.selectedPlan$);
  public stateLoading$: Observable<CallState> = this.store.select(seletStateLoading);

  private hasPrevPage: boolean;
  private destroy$ = new Subject<void>();

  constructor(
    private store: Store<ISubscriptionPlanState>,
    private presenter: SubscriptionPlanPresenter,
    private dialog: MatDialog,
    @Inject(WINDOW) private window: Window,
    private router: Router) {
      this.hasPrevPage = !!(this.router.getCurrentNavigation().previousNavigation);
  }

  public ngOnInit(): void {
    this.form = this.presenter.getForm();
    this.promoCtrl = this.presenter.getPromoCtrl(this.form);

    if (!this.hasPrevPage) {
      this.initSubscriptionPlans();
    }
    this.currentPlan$.subscribe(p => this.selectPlan(p));
    this.initPromoCodeErrorsListener();
  }

  public onClose() {
    this.window.history.back();
  }

  public setPlanWithPromoCode() {
    this.isSelectedCurrentPlan$.pipe(take(1)).subscribe((selected: boolean) => {
      selected ? this.currentPlan$.subscribe(plan => this.setPlanWithPromo(plan)) :
        this.setPlanAsActive();
    });
  }

  public checkPromoCode() {
    this.currentPlan$.subscribe(plan => this.checkPromo(plan));
  }

  public setPlanAsActive(): void {
    combineLatest([this.currentPlan$, this.selectedPlan$]).pipe(take(1))
      .subscribe(plans => {
        const promo = this.presenter.getPromoFromPlan(plans[0]);
        this.openDialog(plans[0], plans[1], promo).subscribe((p: IChangeAccountPlanModal) =>
          this.setPlanWithPromo(p.new));
      });
  }

  private checkPromo(plan: IAccountPlan): void {
    const code = this.form.value.promo;
    this.store.dispatch(checkSubscriptionPlanPromo({ stripe_plan_id: plan.id, promo_code: code, locations: plan.additional_location_qty - 1 }));
  }

  private setPlanWithPromo(plan: IAccountPlan): void {
    const code = this.form.value.promo;
    this.store.dispatch(setSubscriptionPlanPromo({ stripe_plan_id: plan.id, promo_code: code, locations: 0 }));
  }

  private openDialog(oldPlan: IAccountPlan, newPlan: IAccountPlan, promo: IApplyPromoRes = null): Observable<IChangeAccountPlanModal> {
    const nextPlan = this.presenter.extendPlan(oldPlan, newPlan);
    return this.presenter.openDialog(this.dialog, oldPlan, nextPlan, promo);
  }

  private initPromoCodeErrorsListener(): void {
    this.errors$.pipe(takeUntil(this.destroy$)).subscribe(err =>
      err ? this.promoCtrl.setErrors({ invalidPromo: true }) : this.promoCtrl.setErrors(null)
    );
  }

  private initSubscriptionPlans() {
    this.store.dispatch(getSubscriptionPlans());
    this.store.dispatch(getSubscription());
  }

  public selectPlan(plan: IAccountPlan): void {
    this.store.dispatch(selectPlan({ result: plan, callState: null }));
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
