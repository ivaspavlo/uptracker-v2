import { FormControlType } from '@app/shared/constants';
import { IOption } from './option.interface';
import { ValidationErrors } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

export interface IFormFieldError {
    message: string;
}

export type IFormFieldErrorMap = Map<string, string>;

export interface IFormFieldState {
    class?: string;
    icon?: string;
    mask?: string;
    errorStateMatcher?: ErrorStateMatcher;
    requiredLabel?: boolean;
    label: string;
    visible: boolean;
    formControlName: string;
    formControlType: FormControlType;
    value: any;
    prefix: string;
    suffix: string;
    currentErrors: IFormFieldError[];
}

export interface IFormField extends IFormFieldState {
    show: () => void;
    hide: () => void;
    setCurrentErrors: (errors: ValidationErrors) => void;
}

export interface IFormFieldWithOptionsState extends IFormFieldState {
    options: IOption[];
}

export type IInputType = 'button' | 'checkbox' | 'color' | 'date' | 'datetime-local' | 'email' | 'file' | 'hidden' | 'image' | 'month' | 'number' | 'password' | 'radio' | 'range' | 'reset' | 'search' | 'submit' | 'tel' | 'text' | 'time' | 'url' | 'week';

export interface IInputFormFieldWithState extends IFormFieldState {
    placeholder: string;
    type: IInputType;
}

export interface IFormFieldWithOptions extends IFormField, IFormFieldWithOptionsState {
    enableAllOptions: () => void;
    disableAllOptions: () => void;
    disableOption: (optionLabel: string) => void;
}

export interface ICustomFormFieldState extends IFormFieldState {
    fieldKey: string;
}

export interface ICustomFormField extends IFormField, ICustomFormFieldState { }
