
import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { skip, first, takeUntil } from 'rxjs/operators';

import { ILocationReq, ILocation, ICurrency } from '@app/interfaces';
import { get } from '@app/shared/helpers';
import { selectLocationsLoading, selectLocationImg, selectSpecificLocation, selectLocationCallStateHasError } from '@app/core/store/selectors/locations.selector';
import { addLocationImgAction, editLocationAction, createLocationAction } from '@app/core/store/actions/locations.actions';


@Component({
  selector: 'app-create-edit-location',
  templateUrl: './create-edit-location.component.html',
  styleUrls: ['./create-edit-location.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateEditLocationComponent implements OnInit, OnDestroy {

  public editLocationId: string;
  public isFormValid = false;
  public isLoading$: Observable<boolean>;
  public currentStreetImage$: Observable<string>;
  public editLocationData$: Observable<{ selected_location: ILocation }>;
  public currencies: ICurrency[];

  private VIEW_LOCATIONS_URL = '/locations';
  private componentDestroyed$ = new Subject();

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.initCurrencies();
    this.initEditLocationId();
    this.initIsLoadingObservable();
    this.initCurrentStreetImage();
    this.initEditLocationObservable();
  }

  // PUBLIC METHODS

  public onImgSelected(data: FormData): void {
    this.store.dispatch(addLocationImgAction({ data }));
  }

  public onSubmit(req: ILocationReq): void {
    this.editLocationId ? this.store.dispatch(editLocationAction(req)) : this.store.dispatch(createLocationAction(req));
    this.listenToSubmitResult();
  }

  // PRIVATE METHODS

  private initEditLocationId(): void {
    this.editLocationId = get(this.route, 'snapshot.params.location_id');
  }

  private initEditLocationObservable(): void {
    this.editLocationData$ = this.store.select(selectSpecificLocation, { location_id: this.editLocationId });
  }

  private initCurrentStreetImage(): void {
    this.currentStreetImage$ = this.store.select(selectLocationImg).pipe(skip(1));
  }

  private initIsLoadingObservable(): void {
    this.isLoading$ = this.store.select(selectLocationsLoading);
  }

  private initCurrencies(): void {
    this.currencies = this.activatedRoute.snapshot.data.currencies;
  }

  private listenToSubmitResult(): void {
    this.store.select(selectLocationCallStateHasError).pipe(
      skip(1),
      first(),
      takeUntil(this.componentDestroyed$)
    ).subscribe(({ hasError }: { hasError: boolean }) => { if (!hasError) { this.router.navigateByUrl(this.VIEW_LOCATIONS_URL); } });
  }

  ngOnDestroy() {
    this.componentDestroyed$.next();
    this.componentDestroyed$.complete();
  }

}
