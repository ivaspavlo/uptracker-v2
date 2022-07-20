
import { Component, OnInit, ChangeDetectionStrategy, Inject, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subject, Observable } from 'rxjs';
import { map, takeUntil, switchMap, tap, first } from 'rxjs/operators';

import { EmailInputErrorsMap } from '@app/shared/constants';
import { ModalFormCtrlNames } from '../../constants/modal-form-ctrl-names';
import { IUserManagementModal } from '../../interfaces';

@Component({
  selector: 'app-user-invite-modal',
  templateUrl: './user-invite-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserInviteModalComponent implements OnInit, OnDestroy {

  public form: FormGroup;
  public ctrls: { [key: string]: AbstractControl } = {};
  public ctrlNames = ModalFormCtrlNames;
  public emailErrorsMap = EmailInputErrorsMap;
  public _emailChange$: Subject<{ email_address: string }> = new Subject();
  public emailChange$: Observable<{ email_address: string }> = this._emailChange$.asObservable();

  private BLUR_EVENT_NAME = 'blur';
  private componentDestroyed$: Subject<void> = new Subject();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IUserManagementModal,
    public dialogRef: MatDialogRef<UserInviteModalComponent>,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.initForm(this.data.user);
    this.initCtrls();
    this.listenToEmailCtrlChange();
  }

  public onConfirm(): void {
    this._emailChange$.next(this.ctrls[this.ctrlNames.email_address].value);
    this.data.emailIsUsed$.pipe(first()).subscribe((res: boolean) => !res && this.dialogRef.close(this.form.value));
  }

  private initForm({
    id = null,
    invite_token = null,
    name = null,
    email_address = null,
    role = null,
    locations = []
  } = {}): void {
    this.form = this.fb.group({
      [ModalFormCtrlNames.id]: [id],
      [ModalFormCtrlNames.invite_token]: [invite_token],
      [ModalFormCtrlNames.name]: [name, Validators.required],
      [ModalFormCtrlNames.email_address]: [email_address, { validators: [Validators.required, Validators.email], updateOn: this.BLUR_EVENT_NAME }],
      [ModalFormCtrlNames.role]: [role, Validators.required],
      [ModalFormCtrlNames.locations]: [locations, Validators.required]
    });
  }

  private listenToEmailCtrlChange(): void {
    const emailCtrl = this.ctrls[this.ctrlNames.email_address];
    emailCtrl.valueChanges.pipe(
      takeUntil(this.componentDestroyed$),
      tap((email_address: string) => this._emailChange$.next({ email_address })),
      switchMap(_ => this.data.emailIsUsed$),
      map((isUsed: boolean) => {
        if (isUsed) { return { ...emailCtrl.errors, emailAddressUsed: true }; }
        if (!isUsed && emailCtrl.errors && emailCtrl.errors.emailAddressUsed) {
          const { emailAddressUsed, ...errors } = emailCtrl.errors;
          return Object.keys(errors).length ? errors : null;
        }
        return emailCtrl.errors;
      })
    ).subscribe(errors => { emailCtrl.setErrors(errors); this.cdr.detectChanges(); });
  }

  private initCtrls(): void {
    Object.keys(ModalFormCtrlNames).forEach(key => { this.ctrls[key] = this.form.get(key); });
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next();
    this.componentDestroyed$.complete();
  }

}
