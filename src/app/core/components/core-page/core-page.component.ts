
import { Component, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { filter, first, takeUntil, take } from 'rxjs/operators';

import { IUserProfile, ILocation } from '@app/interfaces';
import { SocketService, UrlService } from '@app/core/services';

import { logoutAction } from '@app/core/store/actions/auth.actions';
import { getLocationsAction, changeCurrentLocationAction } from '@app/core/store/actions/locations.actions';
import { getProfileDataAction } from '@app/core/store/actions/user.actions';

import { selectUserProfile } from '@app/core/store/selectors/user.selector';
import { selectLocations, currentLocationSetter, selectCurrentLocation } from '@app/core/store/selectors/locations.selector';


@Component({
  selector: 'app-core-page',
  templateUrl: './core-page.component.html',
  styleUrls: ['./core-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CorePageComponent implements OnInit, OnDestroy {

  public userProfile$: Observable<IUserProfile>;
  public locations$: Observable<ILocation[]>;
  public currentLocation$: Observable<string>;
  public currentPage$: Observable<string>;

  private destroy$ = new Subject<void>();

  constructor(
    private route: Router,
    private store: Store,
    private urlService: UrlService,
    private socketService: SocketService
  ) { }

  ngOnInit(): void { this.initProperties(); }

  // PUBLIC METHODS

  public onLogOut(): void {
    this.store.dispatch(logoutAction());
  }

  public onLocationChange(current_location: string): void {
    this.store.dispatch(changeCurrentLocationAction({ current_location }));
  }

  public onPreviousPage(): void {
    this.urlService.previousUrl$.pipe(take(1), takeUntil(this.destroy$)).subscribe(url => this.route.navigateByUrl(url));
  }

  // PRIVATE METHODS

  private initProperties(): void {
    this.socketService.init();
    this.setProfileDataToStore();
    this.setLocationsToStore();
    this.setCurrentLocationToStore();
    this.initLocationsObservable();
    this.initCurrentLocationObservable();
    this.initUserProfileObservable();
    this.initCurrentPageObservable();
  }

  private setProfileDataToStore(): void {
    this.store.dispatch(getProfileDataAction());
  }

  private setLocationsToStore(): void {
    this.store.dispatch(getLocationsAction());
  }

  private setCurrentLocationToStore(): void {
    this.store.select(currentLocationSetter).pipe(
      filter(res => !!res), first()
    ).subscribe((res: { current_location: string; }) => this.store.dispatch(changeCurrentLocationAction(res)));
  }

  private initLocationsObservable(): void {
    this.locations$ = this.store.select(selectLocations);
  }

  private initCurrentLocationObservable(): void {
    this.currentLocation$ = this.store.select(selectCurrentLocation);
  }

  private initUserProfileObservable(): void {
    this.userProfile$ = this.store.select(selectUserProfile);
  }

  private initCurrentPageObservable(): void {
    this.currentPage$ = this.urlService.currentUrl$;
  }

  ngOnDestroy(): void {
    this.socketService.shutdown();
    this.destroy$.next();
    this.destroy$.complete();
  }

}
