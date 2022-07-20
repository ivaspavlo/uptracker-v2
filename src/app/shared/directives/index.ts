
import { DisableAfterClickDirective } from './disable-after-click.directive';
import { SpinnerDirective } from './spinner.directive';
import { InputMaskDirective } from './input-mask.directive';
import { PermitDisableDirective } from './permit-disable.directive';
import { PermitHideDirective } from './permit-hide.directive';

export * from './disable-after-click.directive';
export * from './spinner.directive';
export * from './input-mask.directive';
export * from './permit-disable.directive';
export * from './permit-hide.directive';

export const SHARED_DIRECTIVES = [
  DisableAfterClickDirective,
  SpinnerDirective,
  InputMaskDirective,
  PermitDisableDirective,
  PermitHideDirective
];
