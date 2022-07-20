
import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface IAddLocationWarningModal { max_locations_qty: number; additional_location_price: number; }

@Component({
  selector: 'app-add-location-warning-modal',
  templateUrl: './add-location-warning-modal.component.html',
  styleUrls: ['./add-location-warning-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddLocationWarningModalComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IAddLocationWarningModal,
    public dialogRef: MatDialogRef<AddLocationWarningModalComponent>
  ) { }

  ngOnInit(): void { }

}
