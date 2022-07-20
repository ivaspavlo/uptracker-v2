
import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IChangeAccountPlanModal } from '../../interfaces';



@Component({
  selector: 'app-change-account-plan-modal',
  templateUrl: './change-account-plan-modal.component.html',
  styleUrls: ['./change-account-plan-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChangeAccountPlanModalComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ChangeAccountPlanModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IChangeAccountPlanModal
  ) { }

  ngOnInit(): void { }

  public onConfirm(): void {
    this.dialogRef.close({
      old: this.data.old,
      new: this.data.new,
      hasPromo: this.data.promo
    });
  }

}
