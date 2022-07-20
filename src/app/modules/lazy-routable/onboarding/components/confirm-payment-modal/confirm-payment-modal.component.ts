
import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IPaymentMethodRes } from '@app/interfaces';

@Component({
  selector: 'app-confirm-payment-modal',
  templateUrl: './confirm-payment-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfirmPaymentModalComponent implements OnInit {

  public paymentCardMsg = 'payment card';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IPaymentMethodRes | null,
    public dialogRef: MatDialogRef<ConfirmPaymentModalComponent>
  ) { }

  ngOnInit(): void {
    if (this.data) { this.paymentCardMsg = `card ${this.data.brand.toUpperCase()} **** ${this.data.last4}`; }
  }

}
