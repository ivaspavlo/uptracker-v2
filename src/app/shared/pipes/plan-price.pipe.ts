
import { Pipe, PipeTransform } from '@angular/core';
import { IAccountPlan } from '@app/interfaces';

@Pipe({
  name: 'planPrice'
})
export class PlanPricePipe implements PipeTransform {
  transform(plan: IAccountPlan, additional_location_qty: string | number): number {
    const additional_price = +additional_location_qty * (+plan.additional_location_price / 100);
    const plan_price = plan.price / 100;
    return plan_price + additional_price;
  }
}
