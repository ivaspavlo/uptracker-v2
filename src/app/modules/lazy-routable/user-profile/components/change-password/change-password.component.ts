
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ErrorStateMatcher } from '@angular/material/core';

import { mustMatchValidator } from '@app/shared/validators';
import { PasswordsMatchErrorMatcher } from '@app/modules/lazy-routable/auth/helpers'; // TODO
import { PasswordInputErrorsMap } from '@app/shared/constants';

enum ChangePasswordFormCtrlNames {
  current_password = 'current_password',
  password = 'password',
  confirm_password = 'confirm_password'
}

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChangePasswordComponent implements OnInit {

  public form: FormGroup;
  public ctrlNames = ChangePasswordFormCtrlNames;
  public ctrls: { [key: string]: AbstractControl } = {};
  public pwdVisibility = {};
  public hasMatchError: ErrorStateMatcher;
  public errorsMap = PasswordInputErrorsMap;

  constructor(public dialogRef: MatDialogRef<ChangePasswordComponent>) { }

  ngOnInit(): void {
    this.initForm();
    Object.keys(ChangePasswordFormCtrlNames).forEach(key => {
      this.ctrls[key] = this.form.get(key);
      this.pwdVisibility[key] = false;
    });
    this.hasMatchError = new PasswordsMatchErrorMatcher();
  }

  public onSubmit(): void {
    this.dialogRef.close(this.form.value);
  }

  public onTogglePwd(event: MouseEvent, ctrlName: string): void {
    event.preventDefault();
    this.pwdVisibility = { ...this.pwdVisibility, [ctrlName]: !this.pwdVisibility[ctrlName] };
  }

  private initForm(): void {
    this.form = new FormGroup({
      [ChangePasswordFormCtrlNames.current_password]: new FormControl(null, [Validators.required, Validators.minLength(8)]),
      [ChangePasswordFormCtrlNames.password]: new FormControl(null, [Validators.required, Validators.minLength(8)]),
      [ChangePasswordFormCtrlNames.confirm_password]: new FormControl(null, Validators.required)
    }, { validators: mustMatchValidator(this.ctrlNames.confirm_password, this.ctrlNames.password) });
  }

}
