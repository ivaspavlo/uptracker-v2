
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { EmailInputErrorsMap } from '@app/shared/constants';
import { ICoreModuleState } from '@app/core/store';
import { selectUserLoading } from '@app/core/store/selectors/user.selector';
import { remindPasswordAction } from '@app/core/store/actions/auth.actions';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ForgotComponent implements OnInit {

  public form: FormGroup;
  public emailInputErrorsMap: Map<string, string> = EmailInputErrorsMap;
  public isLoading$: Observable<boolean>;
  private EMAIL_CTRL_NAME = 'email_address';

  constructor(
    private fb: FormBuilder,
    private store: Store<ICoreModuleState>
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.isLoading$ = this.store.select(selectUserLoading);
  }

  public onSubmit(): void {
    this.store.dispatch(remindPasswordAction(this.form.value));
  }

  public initForm(): void {
    this.form = this.fb.group(
      { [this.EMAIL_CTRL_NAME]: ['', [Validators.required, Validators.email]] }
    );
  }

}
