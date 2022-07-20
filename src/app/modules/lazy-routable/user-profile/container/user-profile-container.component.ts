
import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';

import { Subject, Observable, of } from 'rxjs';
import { first, filter, map, takeUntil, tap, pluck, skip, distinctUntilChanged } from 'rxjs/operators';

import * as UserActions from '@app/core/store/actions/user.actions';
import { selectLocations, selectUserLoading, selectUserProfile } from '@app/core/store/selectors';
import { ILocation, CanComponentDeactivate, CanDeactivateResponse, IUserProfile } from '@app/interfaces';
import { UnsavedWarningModalComponent } from '@app/modules/non-lazy-routable';
import { EditImageComponent } from '@app/modules/ui-elements/edit-image/edit-image/edit-image.component';
import { Departments, EditImageTypes, DIALOG_SIZES } from '@app/shared/constants';
import { UptrackerCountryCodes } from '@app/shared/constants';

import { ChangePasswordComponent } from '../components';
import { UserProfileFormCtrlNames } from '../models';
import { UserProfileContainerPresenter } from './user-profile-container-presenter.component';

@Component({
  selector: 'app-user-profile-container',
  templateUrl: './user-profile-container.component.html',
  styleUrls: ['./user-profile-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [UserProfileContainerPresenter]
})
export class UserProfileContainerComponent implements OnInit, OnDestroy, CanComponentDeactivate {

  public form: FormGroup;
  public isLoading$: Observable<boolean>;
  public ctrlNames = UserProfileFormCtrlNames;
  public ctrls: { [key: string]: FormControl };
  public departments = Departments;
  public locations$: Observable<ILocation[]>;
  public avatar$: Observable<any>;
  public formSubmitted = false;
  public countryCodes = UptrackerCountryCodes;

  private userProfile$: Observable<IUserProfile>;
  private componentDestroyed$: Subject<void> = new Subject();

  constructor(
    private presenter: UserProfileContainerPresenter,
    private store: Store,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.userProfile$ = this.store.select(selectUserProfile).pipe(filter((res: IUserProfile) => !!res));
    this.avatar$ = this.userProfile$.pipe(pluck(this.ctrlNames.avatar), distinctUntilChanged());
    this.isLoading$ = this.store.select(selectUserLoading);
    this.locations$ = this.store.select(selectLocations);
    this.listenToAvatarUpdates();
    this.initForm();
  }

  // PUBLIC METHODS

  public canDeactivate(): CanDeactivateResponse {
    return this.form.dirty ?
      this.dialog.open(UnsavedWarningModalComponent, { width: DIALOG_SIZES.MD }).afterClosed().pipe(
        first(),
        tap((res: boolean | null) => { if (res) { this.onSubmit(); } }),
        map((res: boolean | null) => res !== null)
      ) : of(true);
  }

  public onChangePassword(): void {
    this.dialog.open(ChangePasswordComponent, { width: DIALOG_SIZES.MD }).afterClosed().pipe(
      filter(res => !!res)
    ).subscribe((req: { password: string }) => {
      this.store.dispatch(UserActions.changePasswordAction(req));
    });
  }

  public onSubmit(): void {
    this.formSubmitted = true;
    this.store.dispatch(UserActions.updateProfileAction(this.form.value));
    this.form.markAsPristine();
    this.isLoading$.pipe(skip(1), filter((res: boolean) => !res), first()).subscribe(_ => this.formSubmitted = false);
  }

  public onChangeTel(event: { country_code: string; phone_number: string; }): void {
    this.form.patchValue(event);
  }

  public onEditAvatar(): void {
    this.dialog.open(EditImageComponent, { data: { formDataTitle: EditImageTypes.avatar }, minWidth: DIALOG_SIZES.SM })
      .afterClosed().pipe(
        first(), filter(req => !!req)
      ).subscribe((data: FormData | null) => {
        this.store.dispatch(UserActions.uploadAvatarAction({ data }));
      });
  }

  // PRIVATE METHODS

  private initForm(): void {
    this.userProfile$.pipe(first()).subscribe((res: IUserProfile) => {
      this.form = this.presenter.initForm(res);
      this.ctrls = this.presenter.getControls(UserProfileFormCtrlNames, this.form);
      this.cdr.detectChanges();
    });
  }

  private listenToAvatarUpdates(): void {
    this.avatar$.pipe(
      skip(1),
      filter(_ => !!this.form),
      takeUntil(this.componentDestroyed$)
    ).subscribe((res: string) => this.form.patchValue({ [this.ctrlNames.avatar]: res }));
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next();
    this.componentDestroyed$.complete();
  }

}
