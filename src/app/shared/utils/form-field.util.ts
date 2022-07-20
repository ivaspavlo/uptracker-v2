
import { ValidationErrors, FormGroup } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { merge } from 'rxjs';
import { tap, startWith } from 'rxjs/operators';

import { FormControlType } from '../constants';
import { isNullOrUndefined } from '../helpers';
import { DefaultInputErrorsMap } from '../constants';
import {
  IFormField, IOption, IFormFieldWithOptions, IFormFieldState,
  ICustomFormFieldState, ICustomFormField, IFormFieldErrorMap, IFormFieldError,
  IInputFormFieldWithState, IInputType
} from '@app/interfaces';

// TYPES

type IFormFieldParams =
  Omit<IFormFieldState, 'value' | 'visible' | 'suffix' | 'prefix' | 'currentErrors'>
  & Partial<Pick<IFormFieldState, 'value' | 'visible' | 'suffix' | 'prefix'>>
  & { errorMap?: IFormFieldErrorMap };
type ISelectFormFieldParams = Omit<IFormFieldWithOptionsParams, 'formControlType'>;
type IFormFieldWithOptionsParams = IFormFieldParams & { options: IOption[] };
type IButtonToggleFormFieldParams = Omit<IFormFieldWithOptionsParams, 'formControlType'>;
type IInputFormFieldParams = Omit<IFormFieldParams, 'formControlType'> & Partial<Pick<IInputFormFieldWithState, 'placeholder' | 'type'>>;
type ICustomFormFieldParams = Omit<IFormFieldParams, 'formControlType'> & Pick<ICustomFormFieldState, 'fieldKey'>;
type IRadioFormFieldParams = Omit<IFormFieldWithOptionsParams, 'formControlType'>;

// CLASSES

class FormField implements IFormField {
  private _class: string;
  private _icon: string;
  private _mask: string;
  private _requiredLabel: boolean;
  private _label: string;
  private _formControlName: string;
  private _formControlType: FormControlType;
  private _value: any;
  private _prefix: string;
  private _suffix: string;
  private _visible: boolean;
  private _errorMap: IFormFieldErrorMap;
  private _currentError: IFormFieldError[];
  private _errorStateMatcher: ErrorStateMatcher;

  constructor(params: IFormFieldParams) {
    this._class = params.class;
    this._icon = params.icon;
    this._mask = params.mask;
    this._label = params.label;
    this._requiredLabel = params.requiredLabel;
    this._formControlName = params.formControlName;
    this._formControlType = params.formControlType;
    this._value = params.value || null;
    this._prefix = params.prefix || null;
    this._suffix = params.suffix || null;
    this._errorMap = params.errorMap ?? DefaultInputErrorsMap;
    this._visible = params.visible ?? true;
    this._errorStateMatcher = params.errorStateMatcher ?? null;
  }

  public get class(): string {
    return this._class;
  }

  public get label(): string {
    return this._label;
  }

  public get icon(): string {
    return this._icon;
  }

  public get mask(): string {
    return this._mask;
  }

  public get requiredLabel(): boolean {
    return this._requiredLabel;
  }

  public get formControlName(): string {
    return this._formControlName;
  }

  public get formControlType(): FormControlType {
    return this._formControlType;
  }

  public get value(): any {
    return this._value;
  }

  public get visible() {
    return this._visible;
  }

  public get prefix() {
    return this._prefix;
  }

  public get suffix() {
    return this._suffix;
  }

  public get currentErrors() {
    return this._currentError;
  }

  public get errorStateMatcher() {
    return this._errorStateMatcher;
  }

  public setCurrentErrors(errors: ValidationErrors) {
    const [firstError] = Object.keys(errors ?? {})
      .filter(errorKey => isNullOrUndefined(errors[errorKey]) === false && this._errorMap.has(errorKey))
      .map(errorKey => ({ message: this._errorMap.get(errorKey) }));
    this._currentError = firstError ? [firstError] : [];
  }

  public hide() {
    this._visible = false;
  }

  public show() {
    this._visible = true;
  }
}

class FormFieldWithOptions extends FormField implements IFormFieldWithOptions {
  private _options: IOption[];

  constructor(params: IFormFieldWithOptionsParams) {
    super(params);
    this._options = params.options;
  }

  public get options(): IOption[] {
    return this._options;
  }

  public enableAllOptions() {
    this.options.forEach(o => o.disabled = false);
  }

  public disableAllOptions() {
    this.options.forEach(o => o.disabled = false);
  }

  public disableOption(optionLabel: string) {
    this.findOptionByLabel(optionLabel).disabled = true;
  }

  private findOptionByLabel(optionLabel: string) {
    return this.options.find(({ label }) => label === optionLabel);
  }
}

export class ButtonToggleFormField extends FormFieldWithOptions {
  constructor(params: IButtonToggleFormFieldParams) {
    super({ ...params, formControlType: FormControlType.ButtonToggle });
  }
}

export class RadioFormField extends FormFieldWithOptions {
  constructor(params: IRadioFormFieldParams) {
    super({ ...params, formControlType: FormControlType.Radio });
  }
}

export class СheckboxFormField extends FormField implements IFormField {
  constructor(params: IRadioFormFieldParams) {
    super({ ...params, formControlType: FormControlType.Checkbox });
  }
}

export class InputFormField extends FormField implements IInputFormFieldWithState {
  public placeholder: string;
  public type: IInputType;
  constructor(params: IInputFormFieldParams) {
    super({ ...params, formControlType: FormControlType.Input });
    this.placeholder = params.placeholder || '';
    this.type = params.type || 'text';
  }
}

export class CustomFormField extends FormField implements ICustomFormField {
  private _fieldKey: string;
  constructor(params: ICustomFormFieldParams) {
    super({ ...params, formControlType: FormControlType.Custom });
    this._fieldKey = params.fieldKey;
  }
  public get fieldKey(): string {
    return this._fieldKey;
  }
}

export class AutocompleteFormField extends FormFieldWithOptions {
  constructor(params: ISelectFormFieldParams) {
    super({ ...params, formControlType: FormControlType.Autocomplete });
  }
}

export class SelectFormField extends FormFieldWithOptions {
  constructor(params: ISelectFormFieldParams) {
    super({ ...params, formControlType: FormControlType.Select });
  }
}

// HELPERS

export const showFormFieldsBatch = (fields: IFormField[]) => {
  fields.forEach(f => f.show());
};

export const hideFormFieldsBatch = (fields: IFormField[]) => {
  fields.forEach(f => f.hide());
};

export const listenForFormFieldErrors = <T extends { [key: string]: string }>(
  fieldKeys: T,
  fieldMap: Map<string, IFormField>,
  form: FormGroup
) => {
  return merge(
    ...Object.keys(fieldKeys).map((key: string) => {
      const control = form.get(key);
      return merge(
        control.valueChanges,
        control.statusChanges
      ).pipe(
        startWith(null),
        tap(_ => fieldMap.get(key).setCurrentErrors(control.errors))
      );
    })
  );
};
