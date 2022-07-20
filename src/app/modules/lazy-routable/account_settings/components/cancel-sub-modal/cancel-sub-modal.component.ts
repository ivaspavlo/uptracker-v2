
import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { FormGroup, FormControl, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface ICancelSubModal { date: string; }

enum btnNames { option1 = 'Not utilizing the program', option2 = 'Switching to a different inventory management vendor' }
enum CancelSubFormCtrlNames { comment = 'comment', options = 'options', reason = 'reason' }
enum ReasonFormCtrlNames {
  not_enough_time = 'not_enough_time',
  hard_to_use = 'hard_to_use',
  dont_fit_needs = 'dont_fit_needs',
  contact_when_updated = 'contact_when_updated',
  other = 'other'
}

@Component({
  selector: 'app-cancel-sub-modal',
  templateUrl: './cancel-sub-modal.component.html',
  styleUrls: ['./cancel-sub-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CancelSubModalComponent implements OnInit {

  public form: FormGroup;
  public cancelSubFormCtrls: { [key: string]: AbstractControl } = {};
  public reasonFormCtrls: { [key: string]: AbstractControl } = {};
  public btnNames = btnNames;
  public btns = [
    { title: btnNames.option1, img_active: '/assets/img/svg/times-octagon-white.svg', img_inactive: '/assets/img/svg/times-octagon-red.svg' },
    { title: btnNames.option2, img_active: '/assets/img/svg/switch-white.svg', img_inactive: '/assets/img/svg/switch-red.svg' }
  ];
  public currentOption: string = null;

  constructor(
    public dialogRef: MatDialogRef<CancelSubModalComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: ICancelSubModal
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.initFormCtrls();
  }

  public updateReason(reason: string) {
    this.form.get(CancelSubFormCtrlNames.reason).setValue(reason);
  }

  public onConfirm(val: any): void {
    const req = { options: [], reason: val.reason, comment: val.comment };
    Object.keys(ReasonFormCtrlNames).forEach(op => {
      if (val.options[op]) {
        req.options.push(ReasonFormCtrlNames[op]);
      }
    });
    this.dialogRef.close(req);
  }

  private initForm(): void {
    this.form = this.fb.group({
      [CancelSubFormCtrlNames.comment]: [null],
      [CancelSubFormCtrlNames.reason]: [null, Validators.required],
      [CancelSubFormCtrlNames.options]: this.fb.group({
        [ReasonFormCtrlNames.not_enough_time]: [false],
        [ReasonFormCtrlNames.hard_to_use]: [false],
        [ReasonFormCtrlNames.dont_fit_needs]: [false],
        [ReasonFormCtrlNames.contact_when_updated]: [false],
        [ReasonFormCtrlNames.other]: [false]
      })
    });
  }

  private initFormCtrls(): void {
    Object.keys(CancelSubFormCtrlNames).forEach(key => { this.cancelSubFormCtrls[key] = this.form.get(key); });
    Object.keys(ReasonFormCtrlNames).forEach(key => { this.reasonFormCtrls[key] = this.cancelSubFormCtrls[CancelSubFormCtrlNames.options].get(key); });
  }

}
