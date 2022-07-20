import { IAccountPlan, IApplyPromoRes } from "@app/interfaces";


export interface IChangeAccountPlanModal { old: IAccountPlan; new: IAccountPlan; promo: IApplyPromoRes; }
