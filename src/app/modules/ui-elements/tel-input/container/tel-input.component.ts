
import {
  Component, ChangeDetectionStrategy, Input, OnDestroy, HostBinding,
  ElementRef, ViewChild, AfterViewInit, EventEmitter, Output, OnInit, forwardRef, OnChanges, HostListener
} from '@angular/core';
import {
  FormGroup, FormBuilder, NgControl, AbstractControl, ControlValueAccessor,
  NG_VALUE_ACCESSOR, FormControl, NG_VALIDATORS, Validator
} from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { FocusMonitor } from '@angular/cdk/a11y';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ITelInput } from '../interfaces';
import { AllCountryCodes } from '../models/country-codes';

enum TelInputFormCtrlNames {
  phone_number = 'phone_number',
  country_code = 'country_code'
}

const CUSTOM_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => TelInputComponent),
  multi: true
};

const CUSTOM_VALIDATION_ACCESSOR: any = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => TelInputComponent),
  multi: true
};

@Component({
  selector: 'app-tel-input',
  templateUrl: './tel-input.component.html',
  styleUrls: ['./tel-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    CUSTOM_VALUE_ACCESSOR,
    CUSTOM_VALIDATION_ACCESSOR,
    { provide: MatFormFieldControl, useExisting: TelInputComponent }
  ]
})
export class TelInputComponent implements
  ControlValueAccessor, Validator, OnChanges, OnInit, OnDestroy, AfterViewInit, MatFormFieldControl<ITelInput> {

  public form: FormGroup;
  public ctrlNames = TelInputFormCtrlNames;
  public ctrls: { [key: string]: AbstractControl };
  private componentDestroyed$: Subject<void> = new Subject();

  @Input() tel: ITelInput;
  @Input() countryCodes = AllCountryCodes;
  @Output() changeTel: EventEmitter<ITelInput> = new EventEmitter();
  @ViewChild('telInput') telInput: ElementRef<HTMLElement>;
  @Input() errors: Array<any>;
  @Input() formControlName: string;

  // MatFormFieldControl interface implementation

  private _placeholder: string;
  private _required = false;
  private _disabled = false;

  public stateChanges = new Subject<void>();
  public focused = false;
  public errorState = false;
  public ngControl: NgControl = null;

  @Input() set value(value: ITelInput | null) {
    if (!value) {
      value = { phone_number: null, country_code: null }
    }
    this.form.setValue(value);
  }
  get value(): ITelInput {
    return this.form.value;
  }

  get placeholder() {
    return this._placeholder;
  }
  set placeholder(plh: string) {
    this._placeholder = plh;
    this.stateChanges.next();
  }

  get empty() {
    return !this.form.value.phone_number && !this.form.value.country_code;
  }

  @Input()
  get required() {
    return this._required;
  }
  set required(req) {
    this._required = coerceBooleanProperty(req);
    this.stateChanges.next();
  }

  @Input()
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(value: boolean) {
    this._disabled = coerceBooleanProperty(value);
    this._disabled ? this.form.disable() : this.form.enable();
    this.stateChanges.next();
  }

  @HostBinding('class.floating')
  get shouldLabelFloat() {
    return this.focused || !this.empty;
  }

  @HostBinding('attr.aria-describedby') describedBy = '';

  static nextId: number = 0;
  @HostBinding() id = `tel-input-${TelInputComponent.nextId++}`;

  onChanged: any = () => { };
  onTouched: any = () => { };
  validateFn: any = () => { };
  checkForErrors() {
    this.errorState = this.hasErrors();
    this.stateChanges.next();
  }

  writeValue(value: ITelInput): void { this.value = value; }
  registerOnChange(fn) { this.onChanged = fn; }
  registerOnTouched(fn) { this.onTouched = fn; }
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  private hasErrors(): boolean {
    return this.errors && this.errors.length > 0;
  }

  ngOnChanges() {
  }

  public onValidate() {
    this.checkForErrors();
  }

  validate(c: FormControl) {
    return this.validateFn(c);
  }

  constructor(
    private fb: FormBuilder,
    private fm: FocusMonitor
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      [this.ctrlNames.phone_number]: null,
      [this.ctrlNames.country_code]: null
    });
    this.ctrls = {
      [this.ctrlNames.phone_number]: this.form.get(this.ctrlNames.phone_number),
      [this.ctrlNames.country_code]: this.form.get(this.ctrlNames.country_code)
    };
    this.form.valueChanges.pipe(
      takeUntil(this.componentDestroyed$)
    ).subscribe((value: ITelInput) => {
      this.onChanged(value);
    });
  }

  setDescribedByIds(ids: string[]) {
    this.describedBy = ids.join(' ');
  }

  onContainerClick(event: MouseEvent) {
    if ((event.target as Element).tagName.toLowerCase() !== 'input') {
      this.telInput.nativeElement.focus();
    }
  }

  // Angular hooks

  ngAfterViewInit(): void {
    this.fm.monitor(this.telInput.nativeElement, true).subscribe(origin => {
      this.focused = !!origin;
      this.stateChanges.next();
    });
    this.form.patchValue(this.tel, { emitEvent: false });
    this.stateChanges.next();
  }

  ngOnDestroy(): void {
    this.stateChanges.complete();
    this.fm.stopMonitoring(this.telInput.nativeElement);
  }

  // Custom methods

  public onChangeCountryCode(country: string): void {
    this.ctrls[this.ctrlNames.country_code].patchValue(this.countryCodes[country].dial_code);
  }

  public onClickFlagPicker(event): void {
    this.onTouched();
    event.stopPropagation();
  }

}
