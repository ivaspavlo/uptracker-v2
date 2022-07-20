
import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subject, Observable } from 'rxjs';
import { map, tap, startWith } from 'rxjs/operators';
import { ILocation } from '@app/interfaces';
import { get } from '@app/shared/helpers';
import { ILocationUpdateReq, ILocationReq, ILocationUpdateRes } from '../../services/onboarding.service';

export interface ISmallStep { title: string; isDisabled: boolean; isComplete: boolean; }

@Component({
  selector: 'app-onboarding-locations',
  templateUrl: './onboarding-locations.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OnboardingLocationsComponent implements OnInit, OnDestroy {

  @Input() locationsQty: number;
  @Input() set isLoading(value: boolean) { this.isLoading$.next(value); }
  @Input() set preservedLocationForms(value: FormGroup[]) { this.forms = value; }
  @Input() set onboardedLocations(value: { idx: number; location: ILocation; }[]) {
    this.stepComplete.emit(value && value.length === this.locationsQty);
    this.onboardedLocations$.next(value);
  }
  @Input() set storeLocations(value: ILocation[]) { this._storeLocations = value; }
  get storeLocations() { return this._storeLocations || []; }

  @Output() stepComplete: EventEmitter<boolean> = new EventEmitter();
  @Output() setLocation: EventEmitter<ILocationUpdateReq> = new EventEmitter();
  @Output() updateLocation: EventEmitter<ILocationUpdateReq> = new EventEmitter();
  @Output() preserveLocationForms: EventEmitter<FormGroup[]> = new EventEmitter();

  public img$: Subject<any> = new Subject();
  public currentLocationTab = 0;
  public forms: FormGroup[] = [];
  public steps$: Observable<ISmallStep[]>;
  public onboardedLocations$: Subject<{ idx: number; location: ILocation; }[]> = new Subject();
  public isLoading$: Subject<boolean> = new Subject();

  private _storeLocations: ILocation[];
  private componentDestroyed$: Subject<void> = new Subject();

  constructor() { }

  ngOnInit(): void {
    this.initSteps();
  }

  public onSubmitLocation(location: ILocationReq): void {
    const req = { location, idx: this.currentLocationTab };
    location.id ? this.updateLocation.emit(req) : this.setLocation.emit(req);
  }

  private initSteps(): void {
    this.steps$ = this.onboardedLocations$.pipe(
      tap((res: ILocationUpdateRes[]) => this.updateForms(res)),
      startWith(null),
      map(_ => this.getSteps(this.forms))
    );
  }

  private updateForms(res: ILocationUpdateRes[]): void {
    res.forEach(({ idx, location }) => this.forms[idx] && this.forms[idx].patchValue({ id: location.id }));
  }

  private getSteps(forms: FormGroup[]): any {
    return Array.from(Array(this.locationsQty)).map((_, idx: number) =>
      this.getLocationStep(idx, get(forms[idx], 'value.location_name'), get(forms[idx], 'value.id')));
  }

  private getLocationStep(idx: number, title: string = null, isComplete = false): ISmallStep {
    return { title: title || `Location ${idx + 1}`, isComplete, isDisabled: false };
  }

  ngOnDestroy() {
    this.componentDestroyed$.next();
    this.componentDestroyed$.complete();
    this.preserveLocationForms.emit(this.forms);
  }

}
