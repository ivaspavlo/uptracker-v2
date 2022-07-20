
import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';

import { ToastTypes } from '@app/shared/constants';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToastComponent implements OnInit {

  public toastTypes = ToastTypes;

  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: { msg: string, type: string },
    public snackBarRef: MatSnackBarRef<ToastComponent>
  ) { }

  ngOnInit(): void { }

}
