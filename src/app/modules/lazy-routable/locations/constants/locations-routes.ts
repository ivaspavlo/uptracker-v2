
import { Routes } from '@angular/router';
import { CanDeactivateGuard } from '@app/core/guards';
import { ViewLocationsContainerComponent, CreateEditLocationComponent } from '../components';
import { CurrencyResolver } from '../resolvers/currency-resolver.service';

export enum LOCATIONS_ROUTE_NAMES {
  BLANK = '',
  ADD = 'add',
  EDIT = 'edit/:location_id'
}

export const LOCATIONS_ROUTES: Routes = [
  {
    path: LOCATIONS_ROUTE_NAMES.BLANK,
    component: ViewLocationsContainerComponent
  }, {
    path: LOCATIONS_ROUTE_NAMES.EDIT,
    component: CreateEditLocationComponent,
    resolve: { currencies: CurrencyResolver }
  }, {
    path: LOCATIONS_ROUTE_NAMES.ADD,
    component: CreateEditLocationComponent,
    resolve: { currencies: CurrencyResolver },
    canDeactivate: [CanDeactivateGuard]
  }
];
