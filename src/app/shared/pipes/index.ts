
import { InputErrorPipe } from './input-error.pipe';
import { ObjectValuesPipe } from './object-values.pipe';
import { TimesPipe } from './times.pipe';
import { PlanPricePipe } from './plan-price.pipe';
import { PlanDiscountPipe } from './plan-discount.pipe';

export * from './input-error.pipe';
export * from './object-values.pipe';
export * from './plan-discount.pipe';
export * from './plan-price.pipe';
export * from './times.pipe';


export const SHARED_PIPES = [
  InputErrorPipe,
  ObjectValuesPipe,
  PlanPricePipe,
  PlanDiscountPipe,
  TimesPipe
];
