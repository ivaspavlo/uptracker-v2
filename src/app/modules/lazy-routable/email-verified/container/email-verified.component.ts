
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { get } from '@app/shared/helpers';
import { validateOnboardingEmailTokenAction } from '@app/core/store/actions/user.actions';
import { selectOnboardingEmailVerifyRes } from '@app/core/store/selectors/user.selector';

@Component({
  selector: 'app-email-verified',
  templateUrl: './email-verified.component.html',
  styleUrls: ['./email-verified.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmailVerifiedComponent implements OnInit {

  public onboardingEmailVerifyRes$: Observable<any>;

  constructor(
    private route: ActivatedRoute,
    private store: Store
  ) { }

  ngOnInit(): void {
    this.validateOnboardingEmailToken();
    this.initOnboardingEmailVerifyResObservable();
  }

  private validateOnboardingEmailToken(): void {
    this.store.dispatch(validateOnboardingEmailTokenAction({ email_verification_token: get(this.route, 'snapshot.params.email_verification_token') }));
  }

  private initOnboardingEmailVerifyResObservable(): void {
    this.onboardingEmailVerifyRes$ = this.store.select(selectOnboardingEmailVerifyRes);
  }

}
