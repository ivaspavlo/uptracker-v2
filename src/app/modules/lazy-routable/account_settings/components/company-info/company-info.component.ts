
import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IFormField, IOption } from '@app/interfaces';

import PlaceResult = google.maps.places.PlaceResult;

import { Subject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AccountSettingsFormControl } from '../../constants';
import { CompanyInfoPresenter } from './company-info.presenter';

@Component({
  providers: [CompanyInfoPresenter],
  selector: 'app-company-info',
  templateUrl: './company-info.component.html',
  styleUrls: ['./company-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompanyInfoComponent implements OnInit, OnDestroy {
  @Input() isFormLoading: boolean;
  @Input() fields: Map<AccountSettingsFormControl, IFormField>;
  @Input() form: FormGroup;
  @Output() formSubmit: EventEmitter<any> = new EventEmitter();
  @Output() locationSelected: EventEmitter<any> = new EventEmitter();

  private destroy = new Subject<void>();

  constructor(private presenter: CompanyInfoPresenter) { }

  ngOnInit(): void {
    this.emitValue<PlaceResult>(this.presenter.locationSelected$, this.locationSelected);
    this.emitValue<any>(this.presenter.formSubmitted$, this.formSubmit);
  }

  filteredOptions(options: IOption[] = []) {
    return this.presenter.filteredOptions(options, this.form);
  }

  public isInputWithAutocomplete(field: IFormField): boolean {
    return this.presenter.isInputWithAutocomplete(field);
  }

  public isInputControlVisible(field: IFormField): boolean {
    return this.presenter.isInputControlVisible(field);
  }

  public isCheckboxControlVisible(field: IFormField): boolean {
    return this.presenter.isCheckboxControlVisible(field);
  }

  public isInputTypeAutocomplete(field: IFormField): boolean {
    return this.presenter.isInputTypeAutocomplete(field);
  }

  public onSubmit(value): void {
    this.presenter.onFormSubmit(value);
  }

  public clearAll(): void {
    this.presenter.clearAll();
  }

  public onLocationSelected(result: PlaceResult): void {
    this.presenter.onLocationSelected(result);
  }

  private emitValue<T>(obs: Observable<T>, subj: EventEmitter<T>): void {
    obs.pipe(
      takeUntil(this.destroy),
    ).subscribe((val) => subj.emit(val));
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
}
