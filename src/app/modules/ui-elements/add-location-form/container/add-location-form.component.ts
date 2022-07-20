
import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Subject, Observable } from 'rxjs';
import { takeUntil, filter } from 'rxjs/operators';
import PlaceResult = google.maps.places.PlaceResult;

import { IFormField, ILocation, ICurrency } from '@app/interfaces';
import { EditImageTypes, DIALOG_SIZES, UptrackerCountryCodes } from '@app/shared/constants';
import { listenForFormFieldErrors } from '@app/shared/utils';
import { EditImageComponent } from '@app/modules/ui-elements/edit-image/edit-image/edit-image.component';

import { AddLocationFormControl } from './constants/add-location-form-control';
import { AddLocationPresenter } from './add-location-form.presenter';

@Component({
  selector: 'app-add-location-form-component',
  templateUrl: './add-location-form.component.html',
  styleUrls: ['./add-location-form.component.scss'],
  providers: [AddLocationPresenter],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddLocationFormComponent implements OnInit, OnDestroy {

  @ViewChild('f') locNgForm: NgForm;

  @Input() public isFormLoading: Observable<boolean>;
  @Input() public showImg = false;
  @Input() public img: Observable<string>;
  @Input() public initedForm: FormGroup;
  @Input() public editLocation: ILocation;
  @Input() public currencies: ICurrency[];

  @Output() public formSubmit: EventEmitter<any> = new EventEmitter();
  @Output() public imgSelected: EventEmitter<FormData> = new EventEmitter();
  @Output() public formValid: EventEmitter<boolean> = new EventEmitter();
  @Output() public formIsReady: EventEmitter<FormGroup> = new EventEmitter();

  public form: FormGroup;
  public fieldMap: Map<AddLocationFormControl, IFormField>;
  public countryCodes = UptrackerCountryCodes;

  private componentDestroyed$ = new Subject<void>();

  constructor(
    private dialog: MatDialog,
    public presenter: AddLocationPresenter
  ) { }

  public ngOnInit(): void {
    this.fieldMap = this.presenter.getFormFieldMap(this.currencies);
    this.form = this.initedForm || this.presenter.getForm(this.editLocation);
    this.initFormListeners();
    this.formIsReady.emit(this.form);
  }

  private initFormListeners() {
    this.presenter.emitValue<any>(this.presenter.formSubmitted$, this.formSubmit);
    this.isFormLoading.pipe(takeUntil(this.componentDestroyed$)).subscribe((loading: boolean) => loading ? this.form.disable() : this.form.enable());
    this.img.pipe(takeUntil(this.componentDestroyed$)).subscribe(img => this.presenter.updateStreetImage(img, this.form));

    listenForFormFieldErrors(AddLocationFormControl, this.fieldMap, this.form).pipe(takeUntil(this.componentDestroyed$)).subscribe();
    this.form.valueChanges.pipe(takeUntil(this.componentDestroyed$)).subscribe(str => this.formValid.emit(this.form.valid));
  }

  public onEditImage(): void {
    this.dialog.open(EditImageComponent,
      { data: { formDataTitle: EditImageTypes.image }, minWidth: DIALOG_SIZES.SM })
      .afterClosed().pipe(
        takeUntil(this.componentDestroyed$),
        filter(req => !!req))
      .subscribe((data: FormData | null) => this.imgSelected.emit(data));
  }

  public onSubmit(value): void {
    this.presenter.onFormSubmit(value);
  }

  public onLocationSelected(result: PlaceResult): void {
    this.presenter.onLocationSelected(result, this.form);
  }

  private resetForm(): void {
    this.form.reset();
    this.locNgForm.resetForm();
  }

  public ngOnDestroy(): void {
    this.componentDestroyed$.next();
    this.componentDestroyed$.complete();
  }
}
