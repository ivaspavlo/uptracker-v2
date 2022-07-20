
import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { FormGroup, AbstractControl, Validators, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { get } from '@app/shared/helpers';
import { ModalFormCtrlNames } from '../../constants/modal-form-ctrl-names';
import { IUserManagementModal } from '../../interfaces/user-management-modal.interface';

@Component({
  selector: 'app-user-edit-modal',
  templateUrl: './user-edit-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserEditModalComponent implements OnInit {

  public form: FormGroup;
  public ctrls: { [key: string]: AbstractControl } = {};
  public ctrlNames = ModalFormCtrlNames;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IUserManagementModal,
    public dialogRef: MatDialogRef<UserEditModalComponent>,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initForm(get(this, 'data.user', {}));
    this.initCtrls();
  }

  private initForm({
    id = null,
    name = null,
    email_address = null,
    role = null,
    locations = []
  } = {}): void {
    this.form = this.fb.group({
      [ModalFormCtrlNames.id]: [id],
      [ModalFormCtrlNames.name]: [name, Validators.required],
      [ModalFormCtrlNames.email_address]: [email_address, [Validators.required, Validators.email]],
      [ModalFormCtrlNames.locations]: [locations, Validators.required],
      [ModalFormCtrlNames.role]: [role, Validators.required]
    });
  }

  private initCtrls(): void {
    Object.keys(ModalFormCtrlNames).forEach(key => { this.ctrls[key] = this.form.get(key); });
  }

}
