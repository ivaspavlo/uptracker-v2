
import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-apply-payment-banner',
  templateUrl: './apply-payment-banner.component.html',
  styleUrls: ['./apply-payment-banner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ApplyPaymentBannerComponent implements OnInit {

  @Input() isCurrentStepComplete: boolean;
  @Input() paymentCardLastDigits: string;

  constructor() { }

  ngOnInit(): void { }

}
