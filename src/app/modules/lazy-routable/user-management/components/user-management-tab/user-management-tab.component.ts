
import { Component, ChangeDetectionStrategy, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { UserManagementTableHeaders, UserManagementTabs } from '../../models';
import { IUserTableElement } from '../../interfaces';

@Component({
  selector: 'app-user-management-tab',
  templateUrl: './user-management-tab.component.html',
  styleUrls: ['./user-management-tab.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserManagementTabComponent {

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @Input() tabName: string;
  @Input() set users(value: any[]) { this.setTable(value); }
  get users() { return this._users; }

  @Output() editUser: EventEmitter<IUserTableElement> = new EventEmitter();
  @Output() archiveUser: EventEmitter<IUserTableElement> = new EventEmitter();
  @Output() reactivateUser: EventEmitter<IUserTableElement> = new EventEmitter();
  @Output() invite: EventEmitter<void> = new EventEmitter();
  @Output() reInvite: EventEmitter<IUserTableElement> = new EventEmitter();
  @Output() editInvite: EventEmitter<IUserTableElement> = new EventEmitter();
  @Output() deleteInvite: EventEmitter<IUserTableElement> = new EventEmitter();

  public displayedColumns: string[] = UserManagementTableHeaders;
  public dataSource;
  public tabs = UserManagementTabs;
  private _users: any[];

  private setTable(users: any[]): void {
    if (!users) { return this._users = null; }
    this._users = users;
    this.dataSource = new MatTableDataSource(this._users);
    this.dataSource.sort = this.sort;
  }

}
