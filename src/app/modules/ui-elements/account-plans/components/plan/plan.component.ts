
import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { IAccountPlan, IApplyPromoRes } from '@app/interfaces';
import { PROMO_TYPES } from '../../constants';
import * as progressBarHelper from '../helpers/progress-bar-data';
@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlanComponent implements OnInit {

  @Input() plan: any;
  @Input() isAnyPlanSelected: boolean;
  @Input() promo: IApplyPromoRes;
  @Input() isCurrentPlan = false;
  @Input() showLocationsControls = true;

  @Output() selected: EventEmitter<{ plan: IAccountPlan; }> = new EventEmitter();
  @Output() planChange: EventEmitter<{ plan: IAccountPlan; }> = new EventEmitter();
  @Output() planCancel: EventEmitter<{ plan: IAccountPlan; }> = new EventEmitter();
  @Output() qtyChange: EventEmitter<{ qty: number, plan: IAccountPlan; }> = new EventEmitter();

  public daysLeft = 0;
  public progressBarValue = 0;
  public promoTypes = PROMO_TYPES;

  ngOnInit() {
    if (this.plan.start && this.plan.end) {
     const progress = progressBarHelper.getProgressBarData(this.plan);
     this.daysLeft = progress.daysLeft;
     this.progressBarValue = progress.progressBarValue;
    }
  }
}
