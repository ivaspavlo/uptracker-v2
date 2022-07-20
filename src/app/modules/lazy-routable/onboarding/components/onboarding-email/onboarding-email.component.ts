
import { Component, OnInit, ChangeDetectionStrategy, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, AbstractControl, Validators, FormControl } from '@angular/forms';
import { IResendOnboardingInviteReq } from '@app/interfaces';

@Component({
  selector: 'app-onboarding-email',
  templateUrl: './onboarding-email.component.html',
  styleUrls: ['./onboarding-email.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OnboardingEmailComponent implements OnInit {

  @Input() set emailVerified(value: boolean) { this._emailVerified = value; this.stepComplete.emit(!!value); }
  get emailVerified() { return this._emailVerified; }

  @Input() set emailAddress(value: string) {  this._emailAddress = value; if (this.ctrl) { this.ctrl.patchValue(value); } }
  @Input() isLoading: boolean;

  @Output() resend: EventEmitter<IResendOnboardingInviteReq> = new EventEmitter();
  @Output() stepComplete: EventEmitter<boolean> = new EventEmitter();

  public form: FormGroup;
  public ctrl: AbstractControl;
  private _emailAddress: string;
  private _emailVerified: boolean;
  private CTRL_NAME = 'email_address';

  constructor() { }

  ngOnInit(): void {
    this.form = new FormGroup({ [this.CTRL_NAME]: new FormControl(this._emailAddress, [Validators.email, Validators.required]) });
    this.ctrl = this.form.get(this.CTRL_NAME);
  }

}
