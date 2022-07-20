
import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

import { MAT_SNACKBAR_DURATION, ToastTypes, ToastPosition } from '@app/shared/constants';
import { ToastComponent } from '@app/shared/components/toast/toast.component';

@Injectable({
  providedIn: 'root'
})
export class ToasterService {

  constructor(private snackBar: MatSnackBar) { }

  public pop(
    msg: string,
    type = ToastTypes.info,
    duration = MAT_SNACKBAR_DURATION,
    horizontalPosition: MatSnackBarHorizontalPosition = ToastPosition.right,
    verticalPosition: MatSnackBarVerticalPosition = ToastPosition.bottom,
    panelClass = ['uptracker-snackbar']
  ): void {
    this.snackBar.openFromComponent(ToastComponent, { duration, horizontalPosition, verticalPosition, panelClass, data: { msg, type } });
  }

}
