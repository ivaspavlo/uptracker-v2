
import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Subject, BehaviorSubject, Observable, of, combineLatest } from 'rxjs';
import { filter, first, takeUntil, map, shareReplay, switchMap, skip, tap } from 'rxjs/operators';

import { ISocketsMessage, IOnboarding, IAccountPlan, IPaymentMethod, IInvitedUser, IResendOnboardingInviteReq, IApplyPromoRes, IGetTokenReq, IStep, ILocation, IStripeFailureRes } from '@app/interfaces';
import { PUSHER_CUSTOM_EVENTS, DIALOG_SIZES, BASE_URL } from '@app/shared/constants';
import { SocketService, IPaymentMethodRes } from '@app/core/services';
import { get } from '@app/shared/helpers';
import { getProfileDataAction, resendOnboardingInviteAction } from '@app/core/store/actions/user.actions';
import { getAccountPlansAction, getAccountProfileDataAction, setAccountPaymentMethodAction } from '@app/core/store/actions/account.actions';
import { getLocationsAction } from '@app/core/store/actions/locations.actions';
import { selectUserOnboarding, selectUserEmail } from '@app/core/store/selectors/user.selector';
import { selectLocations } from '@app/core/store/selectors/locations.selector';
import { selectAccountPlans, selectAccountPaymentData } from '@app/core/store/selectors/account.selector';

import { ONBOARDING_STEPS } from '../constants/onboarding-steps';
import { Invite } from '../models';
import { applyPromoCodeAction, createSubscriptionAction, inviteTeamAction, createLocationAction, editLocationAction } from '../store/actions/onboarding.actions';
import { selectOnboardingPromo, selectOnboardingLoading, selectIsSubscribedFlag, selectInvitedTeam, selectOnboardedLocations } from '../store/selectors/onboarding.selector';
import { ConfirmPaymentModalComponent } from '../components/confirm-payment-modal/confirm-payment-modal.component';
import { ILocationUpdateReq, ILocationUpdateRes } from '../services/onboarding.service';


interface IOnboardingStep extends IStep { name: string; }
interface IStepCompleteEvent { idx: number; isComplete: boolean; }

@Component({
  selector: 'app-onboarding-container',
  templateUrl: './onboarding-container.component.html',
  styleUrls: ['./onboarding-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OnboardingContainerComponent implements OnInit, OnDestroy {

  @ViewChild('stepsContainer') stepsContainer: ElementRef;

  public steps$: BehaviorSubject<IOnboardingStep[]> = new BehaviorSubject([]);
  public stepsKeys: { [ key: string ]: number };
  public userEmail$: Observable<string>;
  public isEmailVerified$: Observable<boolean>;
  public currentStep$: BehaviorSubject<number>;
  public canStep$: Subject<boolean> = new Subject();
  public accountPlans$: BehaviorSubject<IAccountPlan[]>;
  public currentPlan$: BehaviorSubject<IAccountPlan> = new BehaviorSubject(null);
  public promo$: Observable<IApplyPromoRes>;
  public paymentData$: Observable<{ payment_methods: IPaymentMethod[]; stripe_error: IStripeFailureRes; }>;
  public currentPaymentCard$: Observable<IPaymentMethod>;
  public isLoading$: Observable<boolean>;
  public isNextStepDisabled$: Observable<boolean>;
  public progressBarValue$: Observable<number>;
  public onboardedLocations$: Observable<ILocationUpdateRes[]>;
  public storeLocations$: Observable<ILocation[]>;
  public isPrevStepAvailable$: Observable<boolean>;
  public preservedLocationForms$: BehaviorSubject<FormGroup[]> = new BehaviorSubject([]);
  public invitedTeam$: Observable<IInvitedUser[]>;

  public get currentStep(): number { return this.currentStep$.getValue(); }
  public get lastStep(): number { return Object.keys(ONBOARDING_STEPS).length - 1; }

  private ONE_FIFTH = 20;
  private componentDestroyed$: Subject<void> = new Subject();

  constructor(
    private socketService: SocketService,
    private store: Store,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.store.dispatch(getAccountPlansAction());
    combineLatest(
      this.store.select(selectUserOnboarding).pipe(filter((res: IOnboarding | null) => !!res), first()),
      this.store.select(selectAccountPlans).pipe(filter((res: IAccountPlan[] | null) => !!res), first())
    ).subscribe(([ onboardingData, subscriptionPlans ]: [ IOnboarding, IAccountPlan[] ]) => this.initComponent(onboardingData, subscriptionPlans));
  }

  // PUBLIC METHODS

  public onResend(req: IResendOnboardingInviteReq): void {
    this.store.dispatch(resendOnboardingInviteAction(req));
  }

  public onNext(): void {
    switch (this.currentStep) {
      case this.stepsKeys.plans: { this.createUserSubscription().subscribe((res: boolean) => { if (res) { this.currentStep$.next(this.currentStep + 1); } }); } break;
      case this.stepsKeys.locations: { this.updateUserProfileData(); this.currentStep$.next(this.currentStep + 1); } break;
      case this.stepsKeys.team: { this.router.navigateByUrl(BASE_URL); } break;
      default: { this.currentStep$.next(this.currentStep + 1); }
    }
    this.resetScrollStepsContainer();
  }

  public onPrev(): void {
    if (this.currentStep === 0) { return; }
    this.currentStep$.next(this.currentStep - 1);
    this.resetScrollStepsContainer();
    this.cdr.detectChanges();
  }

  private resetScrollStepsContainer(): void {
    this.stepsContainer.nativeElement.scrollTop = 0;
  }

  public onStepComplete(event: IStepCompleteEvent): void {
    this.steps$.next(
      this.steps$.getValue().map(step => this.getUpdatedStep(step, event))
    );
    this.cdr.detectChanges();
  }

  public onPlanChange({ plan, qty }: { plan: IAccountPlan, qty?: number }): void {
    const currentPlan = qty || qty === 0 ?
      { ...this.accountPlans$.getValue().find(p => p.id === plan.id), additional_location_qty: qty } :
        { ...plan, isSelected: true };
    this.accountPlans$.next(
      this.accountPlans$.getValue().map(p => p.id === currentPlan.id ? currentPlan : { ...p, isSelected: false })
    );
    if (currentPlan.isSelected) { this.currentPlan$.next(currentPlan); }
  }

  public onApplyPromo(data: string): void {
    this.store.dispatch(applyPromoCodeAction({ data }));
  }

  public onInviteTeam(emails: string[]): void {
    this.store.dispatch(inviteTeamAction({
      invites: emails.map(email => new Invite(email)),
      invite_id: null
    }));
  }

  public onCardSave(req: IGetTokenReq): void {
    this.store.dispatch(setAccountPaymentMethodAction(req));
  }

  public initIsLoadingObservable(): void {
    this.isLoading$ = this.store.select(selectOnboardingLoading);
  }

  public onLocationSet(req: ILocationUpdateReq): void {
    this.store.dispatch(createLocationAction(req));
  }

  public onLocationUpdate(req: ILocationUpdateReq): void {
    this.store.dispatch(editLocationAction(req));
  }

  // PRIVATE METHODS

  private initComponent(onboardingData: IOnboarding, subscriptionPlans): void {
    this.updateAccountDataInStore();
    this.initUserEmailObservable();
    this.initSteps(onboardingData.step - 1);
    this.initIsEmailVerified(onboardingData.step - 1);
    this.initCurrentStepObservable(onboardingData.step - 1);
    this.initPromoObservable();
    this.initPaymentDataObservable();
    this.initCurrentPaymentCardObservable();
    this.initIsLoadingObservable();
    this.initIsCurrentStepCompleteObservable();
    this.initProgressBarValueObservable();
    this.initOnboardedLocationsObservable();
    this.initSubscriptionPlansObservable(subscriptionPlans);
    this.initIsPrevStepAvailableObservable(onboardingData.complete);
    this.initInvitedTeamObservable();
    this.initStoreLocationsObservable();
    this.cdr.detectChanges();
  }

  private initIsEmailVerified(currentStep: number): void {
    this.isEmailVerified$ = currentStep > this.stepsKeys.email ?
      of(true) : this.socketService.getEvents().pipe(
        map((msg: ISocketsMessage) => msg.eventName === PUSHER_CUSTOM_EVENTS.EMAIL_VERIFICATION),
        filter((res: boolean) => !!res),
        first(),
        takeUntil(this.componentDestroyed$),
        shareReplay(1)
      );
  }

  private initUserEmailObservable(): void {
    this.userEmail$ = this.store.select(selectUserEmail).pipe(filter((res: string) => !!res));
  }

  private initPromoObservable(): void {
    this.promo$ = this.store.select(selectOnboardingPromo);
  }

  private initPaymentDataObservable(): void {
    this.paymentData$ = this.store.select(selectAccountPaymentData);
  }

  private initCurrentPaymentCardObservable(): void {
    this.currentPaymentCard$ = this.store.select(selectAccountPaymentData).pipe(
      map((res: IPaymentMethodRes) => {
        const paymentMethods = res ? res.payment_methods : null;
        return paymentMethods ? paymentMethods[paymentMethods.length - 1] : null;
      })
    );
  }

  private initProgressBarValueObservable(): void {
    this.progressBarValue$ = combineLatest(
      this.steps$,
      this.currentStep$
    ).pipe(
      map(([steps, currStep]) => {
        const isComplete = steps[currStep].isComplete;
        if (currStep === 0 && isComplete) { return this.ONE_FIFTH; }
        if (currStep === 0 && !isComplete) { return 0; }
        return isComplete ? (currStep + 1) * this.ONE_FIFTH : currStep * this.ONE_FIFTH;
      })
    );
  }

  private initOnboardedLocationsObservable(): void {
    this.onboardedLocations$ = this.store.select(selectOnboardedLocations);
  }

  private createUserSubscription(): Observable<boolean> {
    return this.currentPaymentCard$.pipe(
      first(),
      switchMap((res: IPaymentMethodRes) => this.openConfirmPaymentModal(res)),
      switchMap((res: boolean) => res ? combineLatest(this.promo$, this.currentPlan$).pipe(first()) : of(null)),
      switchMap((res: [IApplyPromoRes, IAccountPlan] | null) => {
        if (!res) { return of(false); }
        const [ appliedPromo, plan ] = res;
        this.store.dispatch(
          createSubscriptionAction({ stripe_plan_id: plan.id, locations: plan.additional_location_qty, promo_code: get(appliedPromo, 'promo_code', null) })
        );
        return this.store.select(selectIsSubscribedFlag).pipe(skip(1), first());
      }),
      tap((res: boolean) => { if (res) { this.diasbleStepsAfterSubCreated(); }})
    );
  }

  private initSubscriptionPlansObservable(plans: IAccountPlan[]): void {
    this.accountPlans$ = new BehaviorSubject(
      plans.map(p => ({ ...p, additional_location_qty: 0, isSelected: false }))
    );
  }

  private openConfirmPaymentModal(paymentMethod: IPaymentMethodRes): Observable<boolean> {
    return this.dialog.open(ConfirmPaymentModalComponent, { width: DIALOG_SIZES.MD, data: paymentMethod }).afterClosed();
  }

  private initInvitedTeamObservable(): void {
    this.invitedTeam$ = this.store.select(selectInvitedTeam);
  }

  private updateUserProfileData(): void {
    this.store.dispatch(getLocationsAction());
    this.store.dispatch(getProfileDataAction());
  }

  private initStoreLocationsObservable(): void {
    this.storeLocations$ = this.store.select(selectLocations);
  }

  // STEPS LOGIC

  private initSteps(onboardingStep: number): void {
    this.stepsKeys = ONBOARDING_STEPS.reduce((acc, step: IOnboardingStep, idx: number) => ({ ...acc, [step.name]: idx }), {});
    this.steps$.next(
      ONBOARDING_STEPS.map((step: IOnboardingStep, idx: number) => ({
        ...step,
        isComplete: idx < onboardingStep,
        isDisabled: this.initStepDisabledState(idx, onboardingStep)
      }))
    );
  }

  private initStepDisabledState(currtentStepIdx: number, onboardingStep: number): boolean {
    const isPlanChosen = onboardingStep > this.stepsKeys.plans;
    const isLocationCreated = onboardingStep > this.stepsKeys.locations;
    const isDisabled =
      currtentStepIdx > onboardingStep ||
      (isPlanChosen && currtentStepIdx <= this.stepsKeys.plans) ||
      (isLocationCreated && currtentStepIdx <= this.stepsKeys.locations);
    return isDisabled;
  }

  private initCurrentStepObservable(currentStep: number): void {
    this.currentStep$ = new BehaviorSubject(currentStep);
  }

  private initIsCurrentStepCompleteObservable(): void {
    this.isNextStepDisabled$ = combineLatest(
      this.steps$,
      this.currentStep$
    ).pipe( map(([steps, currStep]) => steps[currStep] ? !steps[currStep].isComplete : true) );
  }

  private getUpdatedStep(step: IOnboardingStep, event: IStepCompleteEvent): IOnboardingStep {
    return {
      ...step,
      isComplete: step.isComplete || (step.idx === event.idx && event.isComplete),
      isDisabled: event.isComplete && step.idx === event.idx + 1 ? false : step.isDisabled
    };
  }

  private diasbleStepsAfterSubCreated(): void {
    this.steps$.next(
      this.steps$.getValue().map((step, idx) => idx < this.stepsKeys.locations ? { ...step, isDisabled: true } : step)
    );
  }

  private initIsPrevStepAvailableObservable(onboardingIsComplete: boolean): void {
    this.isPrevStepAvailable$ = this.currentStep$.pipe(
      map((currentStep: number) => currentStep === this.stepsKeys.email || currentStep === this.stepsKeys.locations || onboardingIsComplete)
    );
  }

  private updateAccountDataInStore(): void {
    this.store.dispatch((getAccountProfileDataAction()));
  }

  ngOnDestroy() {
    this.componentDestroyed$.next();
    this.componentDestroyed$.complete();
  }

}
