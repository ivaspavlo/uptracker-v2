
import { Pipe, PipeTransform } from '@angular/core';
import { IAccountPlan, IApplyPromoRes } from '@app/interfaces';

enum PROMO_DISCOUNT_TYPES {
  percentage = 'percentage',
  amount = 'amount'
}

@Pipe({
  name: 'planDiscount'
})
export class PlanDiscountPipe implements PipeTransform {
  transform(plan: IAccountPlan, promo: IApplyPromoRes): number {
    switch (promo.type) {
      case PROMO_DISCOUNT_TYPES.percentage: { return this.calcPercentDiscount(plan, promo.discount); }
      case PROMO_DISCOUNT_TYPES.amount: { return this.calcAmountDiscount(plan, promo.discount); }
    }
  }

  private calcPercentDiscount(plan: IAccountPlan, discount: number): number {
    if (discount === 100) { return 0; }
    const fullPrice = this.calcFullPrice(plan);
    const currentDiscount = (fullPrice / 100) * discount;
    return (fullPrice - currentDiscount) / 100;
  }

  private calcAmountDiscount(plan: IAccountPlan, discount: number): number {
    const fullPrice = this.calcFullPrice(plan);
    if ((fullPrice - discount) <= 0) { return 0; }
    return (this.calcFullPrice(plan) - discount) / 100;
  }

  private calcFullPrice(plan: IAccountPlan): number {
    return plan.additional_location_qty * plan.additional_location_price + plan.price;
  }
}
