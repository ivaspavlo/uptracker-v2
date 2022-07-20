
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-unsaved-warning-modal',
  templateUrl: './unsaved-warning-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UnsavedWarningModalComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<UnsavedWarningModalComponent>) { }

  ngOnInit(): void { }

}
