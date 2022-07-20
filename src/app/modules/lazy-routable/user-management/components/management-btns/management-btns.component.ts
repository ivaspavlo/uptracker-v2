
import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { UserManagementTabs } from '../../models';

@Component({
  selector: 'app-management-btns',
  templateUrl: './management-btns.component.html',
  styleUrls: ['./management-btns.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ManagementBtnsComponent {

  @Input() tabName: string;

  @Output() editInvite: EventEmitter<void> = new EventEmitter();
  @Output() reinvite: EventEmitter<void> = new EventEmitter();
  @Output() deleteInvite: EventEmitter<void> = new EventEmitter();
  @Output() editUser: EventEmitter<void> = new EventEmitter();
  @Output() archiveUser: EventEmitter<void> = new EventEmitter();

  public btns = [
    { tooltip: 'Resend Invitation', tabName: UserManagementTabs.invited, action: this.reinvite, iconName: 're-do-blue', iconClass: 're-do-blue-icon' },
    { tooltip: 'Edit Invitation', tabName: UserManagementTabs.invited, action: this.editInvite, iconName: 'pencil-blue', iconClass: 'pencil-blue-icon' },
    { tooltip: 'Delete Invitation', tabName: UserManagementTabs.invited, action: this.deleteInvite, iconName: 'trash-blue', iconClass: 'trash-blue-icon' },
    { tooltip: 'Edit User', tabName: UserManagementTabs.active, action: this.editUser, iconName: 'pencil-blue', iconClass: 'pencil-blue-icon' },
    { tooltip: 'Archive User', tabName: UserManagementTabs.active, action: this.archiveUser, iconName: 'trash-blue', iconClass: 'trash-blue-icon' }
  ];

}
