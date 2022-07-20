
import { Routes } from '@angular/router';
import { NotFoundComponent } from '../container/not-found.component';

export enum NOT_FOUND_ROUTE_NAMES { BLANK = '' }

export const NOT_FOUND_ROUTES: Routes = [{
  path: NOT_FOUND_ROUTE_NAMES.BLANK,
  component: NotFoundComponent
}];
