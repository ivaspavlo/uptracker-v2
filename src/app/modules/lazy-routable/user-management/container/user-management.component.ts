
import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { Subject, forkJoin, BehaviorSubject, Observable } from 'rxjs';
import { first, takeUntil, tap, switchMap, skip, map, distinctUntilChanged, filter } from 'rxjs/operators';

import { IUserState } from '@app/interfaces';
import { ILocation, IRole, IUserProfile } from '@app/interfaces';
import { DIALOG_SIZES } from '@app/shared/constants';
import { asIsOrdering } from '@app/shared/helpers';
import { selectLocations, selectUserState, selectAccountUsers, selectCurrentLocation, selectInvitedUsers, selectArchivedUsers, selectRoles, selectUserProfile } from '@app/core/store/selectors';
import { checkIfEmailAddressInUseAction } from '@app/core/store/actions/auth.actions';
import { getRolesAction } from '@app/core/store/actions/core-page.actions';
import { getAccountUsersAction, getInvitedUsersAction, getArchivedUsersAction, archiveAccountUserAction, inviteUserAction, updateAccountUserAction, editInviteUserAction, deleteInviteUserAction, reactivateAccountUserAction } from '@app/core/store/actions/account.actions';

import { MODAL_TITLES } from '../constants/modal-titles';
import { USER_MANAGEMENT_PERMITS } from '../constants/permits';
import { UserManagementTabs, AccountUserStatuses } from '../models';
import { UserInviteModalComponent, UserEditModalComponent } from '../components';
import { IUserTableElement, IUserManagementModalRes, IEditInviteModalRes } from '../interfaces';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserManagementComponent implements OnInit {

  public locations: ILocation[];
  public userProfile: IUserProfile;
  public permits = USER_MANAGEMENT_PERMITS;
  public tabsData;

  public currentTabName$: BehaviorSubject<string> = new BehaviorSubject(UserManagementTabs.active);
  public footerVisibilityToggler$: Observable<boolean>;
  public asIsOrdering = asIsOrdering;

  private roles: IRole[];
  private componentDestroyed$: Subject<void> = new Subject();

  constructor(
    private store: Store,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.store.dispatch(getRolesAction());
    forkJoin(
      this.store.select(selectLocations).pipe(filter((res: ILocation[]) => res && !!res.length), first()),
      this.store.select(selectRoles).pipe(filter((res: IRole[]) => res && !!res.length), first()),
      this.store.select(selectUserProfile).pipe(filter((res: IUserProfile) => !!res), first())
    ).pipe(first()).subscribe(
      ([ locations, roles, userProfile ]) => {
        this.locations = locations;
        this.roles = roles;
        this.userProfile = userProfile;
        this.initTabsData();
        this.initFooterVisibilityToggler();
        this.listenToCurrentLocationChange();
        this.cdr.detectChanges();
      }
    );
  }

  // PUBLIC METHODS

  public onInvite(): void {
    this.openInviteModal(MODAL_TITLES.invite).afterClosed().pipe(this.modalResponseHandler).subscribe(
      (res: IUserManagementModalRes) => this.store.dispatch(inviteUserAction({ invites: [res], invite_id: res.id })) );
  }

  public onEditInvite(user: IUserTableElement): void {
    this.openInviteModal(MODAL_TITLES.edit_invite, user).afterClosed().pipe(this.modalResponseHandler).subscribe(
      (res: IEditInviteModalRes) => this.store.dispatch(editInviteUserAction(res)) );
  }

  public onReinvite(user: IUserTableElement): void {
    this.store.dispatch(inviteUserAction({ invites: [], invite_id: user.id }));
  }

  public onDeleteInvite(req: { invite_token: string; }): void {
    this.store.dispatch(deleteInviteUserAction(req));
  }

  public onEditUser(user: IUserTableElement): void {
    this.dialog.open(
      UserEditModalComponent,
      { maxWidth: DIALOG_SIZES.MD, autoFocus: false, data: { locations: this.locations, roles: this.roles, title: MODAL_TITLES.edit_user, user } }
    ).afterClosed().pipe(first(), filter(res => !!res)).subscribe((res: IUserManagementModalRes) => {
      this.store.dispatch(updateAccountUserAction({ ...res, status: AccountUserStatuses.active }));
    });
  }

  public onReactivateUser({ id, email_address, name, role, locations }: IUserTableElement): void {
    this.store.dispatch(reactivateAccountUserAction({ id, email_address, name, role, locations, status: AccountUserStatuses.active }));
  }

  public onArchiveUser({ id: user_id }: IUserTableElement): void {
    this.store.dispatch(archiveAccountUserAction({ user_id }));
  }

  // PRIVATE METHODS

  private initTabsData(): void {
    this.tabsData = {
      [UserManagementTabs.active]: {
        data$: this.store.select(selectAccountUsers).pipe(
          distinctUntilChanged(),
          map(users => users ? users.filter(u => u.id !== this.userProfile.id) : users)),
        action: getAccountUsersAction
      },
      [UserManagementTabs.invited]: { data$: this.store.select(selectInvitedUsers).pipe(distinctUntilChanged()), action: getInvitedUsersAction },
      [UserManagementTabs.archived]: { data$: this.store.select(selectArchivedUsers).pipe(distinctUntilChanged()), action: getArchivedUsersAction }
    };
  }

  private initFooterVisibilityToggler(): void {
    this.footerVisibilityToggler$ = this.currentTabName$.pipe(
      switchMap((tabName: string) => this.tabsData[tabName].data$),
      map((res: any[]) => res && !!res.length)
    );
  }

  private listenToCurrentLocationChange(): void {
    this.store.select(selectCurrentLocation).pipe(
      distinctUntilChanged(),
      filter((res: string) => !!res),
      takeUntil(this.componentDestroyed$)
    ).subscribe( (location_id: string) => Object.keys(this.tabsData).forEach(key => this.store.dispatch(this.tabsData[key].action({ location_id }))) );
  }

  private openInviteModal(title: string, user?: IUserTableElement): MatDialogRef<UserInviteModalComponent> {
    const emailIsUsed$: Subject<boolean> = new Subject();
    const dialogRef = this.dialog.open(
      UserInviteModalComponent,
      { maxWidth: DIALOG_SIZES.MD, autoFocus: false, data: { locations: this.locations, roles: this.roles, emailIsUsed$: emailIsUsed$.asObservable(), title, user } }
    );
    dialogRef.componentInstance.emailChange$.pipe(
      takeUntil(dialogRef.afterClosed().pipe(tap(_ => emailIsUsed$.complete()))),
      tap((res: { email_address: string; }) => this.store.dispatch(checkIfEmailAddressInUseAction(res))),
      switchMap(_ => this.store.select(selectUserState).pipe(
        skip(1), first(), map((res: IUserState) => res.email_address_used)
      ))
    ).subscribe((res: boolean) => emailIsUsed$.next(res));
    return dialogRef;
  }

  private modalResponseHandler = (source: Observable<any>) => source.pipe(first(), filter(res => !!res));

}
