
import { Component, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-no-users-plh',
  templateUrl: './no-users-plh.component.html',
  styleUrls: ['./no-users-plh.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NoUsersPlhComponent {

  @Output() invite: EventEmitter<void> = new EventEmitter();

  public onInviteUser(): void {
    this.invite.emit();
  }

}
