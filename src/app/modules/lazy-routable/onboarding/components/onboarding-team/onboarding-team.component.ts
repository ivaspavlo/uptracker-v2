
import { Component, OnInit, ChangeDetectionStrategy, EventEmitter, Output, Input, ChangeDetectorRef } from '@angular/core';
import { Subject } from 'rxjs';
import { IInvitedUser } from '@app/interfaces';

@Component({
  selector: 'app-onboarding-team',
  templateUrl: './onboarding-team.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OnboardingTeamComponent implements OnInit {

  @Input() isLoading: boolean;
  @Input() set invitedTeam(value: IInvitedUser[]) { if (value && value.length) { this.showSuccessInviteBanner(); } }

  @Output() inviteTeam: EventEmitter<string[]> = new EventEmitter();
  @Output() stepComplete: EventEmitter<boolean> = new EventEmitter();

  public emails: string[];
  public clear$: Subject<void> = new Subject();
  public isBannerVisible = false;

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.stepComplete.emit(true);
  }

  public onSendInvite(): void {
    if (this.emails && this.emails.length) {
      this.inviteTeam.emit(this.emails);
      this.clear$.next();
    }
  }

  private showSuccessInviteBanner(): void {
    this.isBannerVisible = true;
    setTimeout(() => { this.isBannerVisible = false; this.cdr.detectChanges(); }, 2000);
  }

}
