
import { Directive, HostListener, Input } from '@angular/core';
import { INPUT_MASK_TYPES } from '@app/shared/constants';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appInputMask]'
})
export class InputMaskDirective {

  @Input() appInputMask: INPUT_MASK_TYPES;

  constructor(private control: NgControl) { }

  @HostListener('input', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (!this.appInputMask) { return; }

    const input = event.target as HTMLInputElement;
    let val: string;

    switch (this.appInputMask) {
      case INPUT_MASK_TYPES.CARD:
        val = this.setCardMask(input);
        break;
      case INPUT_MASK_TYPES.DATE:
        val = this.setDateMask(input);
        break;
      case INPUT_MASK_TYPES.CVV:
        val = this.setCVVMask(input);
        break;
      default:
    }
    this.control.control.setValue(val);
  }

  setCVVMask(input: HTMLInputElement): string {
    let trimmed = input.value.replace(/\D+/g, '');
    if (trimmed.length > 4) {
      trimmed = trimmed.substr(0, 4);
    }
    input.value = trimmed;
    return input.value;
  }

  setDateMask(input: HTMLInputElement): string {
    let trimmed = input.value.replace(/\D+/g, '');
    if (trimmed.length > 4) {
      trimmed = trimmed.substr(0, 4);
    }

    const numbers = [];
    for (let i = 0; i < trimmed.length; i += 2) {
      numbers.push(trimmed.substr(i, 2));
    }

    input.value = numbers.join('/');
    return input.value;
  }

  setCardMask(input: HTMLInputElement): string {
    let trimmed = input.value.replace(/\D+/g, '');

    if (trimmed.length > 16) {
      trimmed = trimmed.substr(0, 16);
    }

    const numbers = [];
    for (let i = 0; i < trimmed.length; i += 4) {
      numbers.push(trimmed.substr(i, 4));
    }

    input.value = numbers.join(' ');
    return input.value;
  }
}
