
import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ILocation } from '@app/interfaces';

@Component({
  selector: 'app-delete-location-modal',
  templateUrl: './delete-location-modal.component.html',
  styleUrls: ['./delete-location-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeleteLocationModalComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ILocation,
    public dialogRef: MatDialogRef<DeleteLocationModalComponent>
  ) { }

  ngOnInit(): void { }

}
