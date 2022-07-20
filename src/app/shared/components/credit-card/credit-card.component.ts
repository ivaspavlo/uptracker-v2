
import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { CREDIT_CARD_VENDORS } from '@app/shared/constants';

@Component({
  selector: 'app-credit-card',
  templateUrl: './credit-card.component.html',
  styleUrls: ['./credit-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreditCardComponent implements OnInit {

  @Input() set card(value: any) { this._card = value; }

  get holderName() { return this._card ? this._card.card_name : 'Bank Card'; }
  get last4() { return this._card ? this._card.last4 : 'XXXX'; }
  get cardVendor() { return this._card ? this._card.brand : CREDIT_CARD_VENDORS.default; }

  public cardVendors = CREDIT_CARD_VENDORS;
  private _card: any;

  constructor() { }

  ngOnInit(): void { }

}
