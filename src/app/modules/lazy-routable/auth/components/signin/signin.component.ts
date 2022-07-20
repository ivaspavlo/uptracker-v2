
import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';

import { Subject, Observable } from 'rxjs';
import { takeUntil, skip, first, map } from 'rxjs/operators';

import { IUserState } from '@app/interfaces';
import { ICoreModuleState } from '@app/core/store';
import { signinAction, checkIfEmailAddressInUseAction } from '@app/core/store/actions/auth.actions';
import { selectUserLoading, selectUserState } from '@app/core/store/selectors/user.selector';
import { FormControlType, PasswordInputErrorsMap, EmailInputErrorsMap, MUST_MATCH_ERROR_NAME, EMAIL_ADDRESS_IN_USE_KEY } from '@app/shared/constants';
import { IFormField } from '@app/interfaces';
import { InputFormField, listenForFormFieldErrors } from '@app/shared/utils';

import { checkIfControlValuesMatched } from '../../helpers';


enum SignInFormControl {
  password = 'password',
  confirm_password = 'confirm_password',
  email_address = 'email_address',
  name = 'name',
  company_name = 'company_name'
}

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SigninComponent implements OnInit, OnDestroy {

  public readonly fieldMap = new Map<SignInFormControl, IFormField>();
  public form: FormGroup;
  public FormControlType = FormControlType;
  public ctrlNames = SignInFormControl;
  public isLoading$: Observable<boolean>;
  private componentDestroyed$ = new Subject<void>();

  constructor(
    private store: Store<ICoreModuleState>
  ) { }

  ngOnInit(): void {
    this.initFormFieldMap();
    this.initForm();
    this.initPasswordsMatchChecker();
    this.isLoading$ = this.store.select(selectUserLoading);
  }

  public onSignIn(): void {
    this.store.dispatch(signinAction(this.form.value));
  }

  private initForm() {
    this.form = new FormGroup({
      [SignInFormControl.email_address]: new FormControl(null, [Validators.required, Validators.email], this.emailIsUsedAsyncValidator.bind(this)),
      [SignInFormControl.password]: new FormControl(null, [Validators.required, Validators.minLength(8)]),
      [SignInFormControl.confirm_password]: new FormControl('', [Validators.required, Validators.minLength(8)]),
      [SignInFormControl.name]: new FormControl(null, Validators.required),
      [SignInFormControl.company_name]: new FormControl(null, Validators.required),
    }, { updateOn: 'blur' });
    listenForFormFieldErrors(
      SignInFormControl,
      this.fieldMap,
      this.form
    ).pipe(takeUntil(this.componentDestroyed$)).subscribe();
  }

  private initFormFieldMap() {
    this.fieldMap.set(SignInFormControl.email_address, new InputFormField({ formControlName: SignInFormControl.email_address, type: 'email', errorMap: EmailInputErrorsMap, label: 'Email', placeholder: 'Please enter an email' }));
    this.fieldMap.set(SignInFormControl.password, new InputFormField({ formControlName: SignInFormControl.password, type: 'password', errorMap: PasswordInputErrorsMap, label: 'Password', placeholder: 'Please enter a passoword' }));
    this.fieldMap.set(SignInFormControl.confirm_password, new InputFormField({ formControlName: SignInFormControl.confirm_password, type: 'password', errorMap: PasswordInputErrorsMap, label: 'Confirm Password', placeholder: 'Please confirm the passoword' }));
    this.fieldMap.set(SignInFormControl.name, new InputFormField({ formControlName: SignInFormControl.name, label: 'Name', placeholder: 'Please enter a name',  }));
    this.fieldMap.set(SignInFormControl.company_name, new InputFormField({ formControlName: SignInFormControl.company_name, label: 'Company Name', placeholder: 'Please enter a company name' }));
  }

  private initPasswordsMatchChecker() {
    const passwordControl = this.form.get(SignInFormControl.password);
    const confirmPasswordControl = this.form.get(SignInFormControl.confirm_password);
    checkIfControlValuesMatched(passwordControl, confirmPasswordControl).pipe(
      takeUntil(this.componentDestroyed$),
    ).subscribe(matched => {
      if (matched) {
        confirmPasswordControl.setErrors({ ...confirmPasswordControl.errors, [MUST_MATCH_ERROR_NAME]: null });
        confirmPasswordControl.updateValueAndValidity({ emitEvent: false });
      } else {
        confirmPasswordControl.setErrors({ ...confirmPasswordControl.errors, [MUST_MATCH_ERROR_NAME]: true });
      }
      this.fieldMap.get(SignInFormControl.confirm_password).setCurrentErrors(confirmPasswordControl.errors);
    });
  }

  private emailIsUsedAsyncValidator(): Observable<{ emailAddressUsed: true } | null> {
    this.checkEmailUsage();
    return this.store.select(selectUserState).pipe(
      skip(1),
      first(),
      map((res: IUserState) => res[EMAIL_ADDRESS_IN_USE_KEY] ? { emailAddressUsed: true } : null)
    );
  }

  private checkEmailUsage(): void {
    this.store.dispatch(
      checkIfEmailAddressInUseAction({ [SignInFormControl.email_address]: this.form.get(SignInFormControl.email_address).value })
    );
  }

  ngOnDestroy() {
    this.componentDestroyed$.next();
    this.componentDestroyed$.complete();
  }

}
