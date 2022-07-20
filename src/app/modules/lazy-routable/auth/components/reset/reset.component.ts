
import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Store, select } from '@ngrx/store';
import { first } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { ICoreModuleState } from '@app/core/store';
import { resetPasswordAction } from '@app/core/store/actions/auth.actions';
import { selectUserPasswordResetData, selectUserLoading } from '@app/core/store/selectors/user.selector';
import { PasswordInputErrorsMap } from '@app/shared/constants';
import { mustMatchValidator } from '@app/shared/validators';

import { PasswordsMatchErrorMatcher } from '../../helpers';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResetComponent implements OnInit {

  public form: FormGroup;
  public hasMustMatchError: ErrorStateMatcher;
  public passwordInputErrorsMap: Map<string, string> = PasswordInputErrorsMap;
  public isLoading$: Observable<boolean>;
  public pwdHidden = true;
  public confirmPwdHidden = true;
  private PASSWORD_CTRL_NAME = 'password';
  private CONFIRM_PASSWORD_CTRL_NAME = 'confirm_password';

  constructor(
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private store: Store<ICoreModuleState>
  ) { }

  ngOnInit(): void {
    this.store.pipe(
      first(),
      select(selectUserPasswordResetData)
    ).subscribe(
      (res: any) => {
        this.initForm(res);
        this.hasMustMatchError = new PasswordsMatchErrorMatcher();
        this.isLoading$ = this.store.select(selectUserLoading);
        this.cdr.detectChanges();
      }
    );
  }

  public onSubmit(): void {
    this.store.dispatch(resetPasswordAction(this.form.value));
  }

  private initForm({ user_id, password_reset_token }): void {
    this.form =  this.fb.group({
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirm_password: ['', Validators.required],
      user_id: [user_id],
      password_reset_token: [password_reset_token]
    }, { validators: mustMatchValidator(this.CONFIRM_PASSWORD_CTRL_NAME, this.PASSWORD_CTRL_NAME) });
  }

}
