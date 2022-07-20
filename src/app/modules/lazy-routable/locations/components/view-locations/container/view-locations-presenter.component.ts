
import { MatDialog } from '@angular/material/dialog';
import { Subject, Observable, of } from 'rxjs';
import { first, switchMap } from 'rxjs/operators';

import { DIALOG_SIZES } from '@app/shared/constants';
import { ILocation, IDeleteLocationReq } from '@app/interfaces';

import { DeleteLocationModalComponent } from '../components/delete-location-modal/delete-location-modal.component';
import { AddLocationWarningModalComponent } from '../components/add-location-warning-modal/add-location-warning-modal.component';

export class ViewLocationsPresenter {

  private deleteLocation = new Subject<IDeleteLocationReq>();
  public deleteLocation$ = this.deleteLocation.asObservable();

  private addLocation = new Subject<ILocation>();
  public addLocation$ = this.addLocation.asObservable();

  public delete(dialog: MatDialog, location: ILocation): void {
    dialog.open(DeleteLocationModalComponent, { data: location, width: DIALOG_SIZES.MD }).afterClosed().subscribe(
      (res: ILocation | null) => { if (res) { this.deleteLocation.next({ location_id: res.id }); }}
    );
  }

  public add(dialog: MatDialog, locationsCombinedData$: Observable<any>): void {
    locationsCombinedData$.pipe(
      first(),
      switchMap(({ current_locations_qty, max_locations_qty, additional_location_price }: any) =>
        current_locations_qty === max_locations_qty ?
          dialog.open(AddLocationWarningModalComponent, { data: { max_locations_qty, additional_location_price }, width: DIALOG_SIZES.MD }).afterClosed() :
          of(true))
    ).subscribe((res: boolean) => { if (res) { this.addLocation.next(); }});
  }

}
