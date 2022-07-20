
import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter, Input } from '@angular/core';
import { IAccountPlan, IApplyPromoRes } from '@app/interfaces';

@Component({
  selector: 'app-account-plans',
  templateUrl: './account-plans.component.html',
  styleUrls: ['./account-plans.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountPlansComponent implements OnInit {

  @Input() plans: IAccountPlan[];
  @Input() promo: IApplyPromoRes | null;

  @Output() planChange: EventEmitter<{ plan: IAccountPlan }> = new EventEmitter();
  @Output() qtyChange: EventEmitter<{ qty: number; plan: IAccountPlan }> = new EventEmitter();

  public get isAnyPlanSelected(): boolean { return this.plans.some(p => p.isSelected); }

  constructor() { }

  ngOnInit(): void { }

}
