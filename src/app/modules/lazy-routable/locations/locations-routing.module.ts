
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LOCATIONS_ROUTES } from './constants';
import { CurrencyResolver } from './resolvers/currency-resolver.service';

@NgModule({
  imports: [
    RouterModule.forChild(LOCATIONS_ROUTES)
  ],
  exports: [
    RouterModule
  ],
  providers: [
    CurrencyResolver
  ]
})
export class LocationsRoutingModule { }
