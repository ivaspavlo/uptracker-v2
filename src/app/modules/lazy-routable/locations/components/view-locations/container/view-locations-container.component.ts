
import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { Subject, merge, Observable } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

import { ILocation, IDeleteLocationReq, IAccountData } from '@app/interfaces';
import { getAccountProfileDataAction, getСurrentAccountPlanAction } from '@app/core/store/actions/account.actions';
import { deleteLocationAction } from '@app/core/store/actions/locations.actions';
import { selectLocations, selectLocationsCombinedData, selectIsOnlyOneLocation, selectMaxLocationQty } from '@app/core/store/selectors/locations.selector';
import { selectAccountData } from '@app/core/store/selectors/account.selector';

import { ViewLocationsPresenter } from './view-locations-presenter.component';


@Component({
  selector: 'app-view-locations-container',
  templateUrl: './view-locations-container.component.html',
  styleUrls: ['./view-locations-container.component.scss'],
  viewProviders: [ViewLocationsPresenter],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewLocationsContainerComponent implements OnInit, OnDestroy {

  public locations$: Observable<ILocation[]>;
  public accountData$: Observable<IAccountData>;
  public isOnlyOneLocation$: Observable<boolean>;
  public maxLocationQty$: Observable<number>;

  private ADD_LOCATION_URL = '/locations/add';
  private EDIT_LOCATION_URL = '/locations/edit';
  private componentDestroyed$: Subject<void> = new Subject();

  constructor(
    private presenter: ViewLocationsPresenter,
    private dialog: MatDialog,
    private store: Store,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.updateAccountProfileData();
    this.updateCurrentAccountPlanData();
    this.initProperties();
    this.listenToPresenter();
  }

  public onDelete(location: ILocation): void {
    this.presenter.delete(this.dialog, location);
  }

  public onAdd(): void {
    this.presenter.add(this.dialog, this.store.select(selectLocationsCombinedData));
  }

  public onEdit(location: ILocation): void {
    this.router.navigateByUrl(`${this.EDIT_LOCATION_URL}/${location.id}`);
  }

  // PRIVATE METHODS

  private updateAccountProfileData(): void {
    this.store.dispatch(getAccountProfileDataAction());
  }

  private updateCurrentAccountPlanData(): void {
    this.store.dispatch(getСurrentAccountPlanAction());
  }

  private initProperties(): void {
    this.locations$ = this.store.select(selectLocations);
    this.accountData$ = this.store.select(selectAccountData);
    this.isOnlyOneLocation$ = this.store.select(selectIsOnlyOneLocation);
    this.maxLocationQty$ = this.store.select(selectMaxLocationQty);
  }

  private listenToPresenter(): void {
    merge(
      this.presenter.deleteLocation$.pipe(tap((req: IDeleteLocationReq) => this.store.dispatch(deleteLocationAction(req)))),
      this.presenter.addLocation$.pipe(tap(_ => this.router.navigateByUrl(this.ADD_LOCATION_URL)))
    ).pipe(
      takeUntil(this.componentDestroyed$)
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next();
    this.componentDestroyed$.complete();
  }

}
