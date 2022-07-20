
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { EmailInputErrorsMap } from '@app/shared/constants';
import { ICoreModuleState } from '@app/core/store';
import { selectUserLoading } from '@app/core/store/selectors/user.selector';
import { loginAction } from '@app/core/store/actions/auth.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {

  public form: FormGroup;
  public emailInputErrorsMap: Map<string, string> = EmailInputErrorsMap;
  public isLoading$: Observable<boolean>;
  public showPwd = false;

  constructor(
    private store: Store<ICoreModuleState>,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.initForm();
    this.isLoading$ = this.store.select(selectUserLoading);
  }

  public onLogin() {
    this.store.dispatch(loginAction(this.form.value));
  }

  private initForm(): void {
    this.form = this.fb.group({
      email_address: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

}
