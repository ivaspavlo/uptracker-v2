
import { CreateEditLocationComponent } from './create-edit-location/container/create-edit-location.component';
import { ViewLocationsContainerComponent } from './view-locations/container/view-locations-container.component';
import { LocationCardComponent } from './view-locations/components/location-card/location-card.component';
import { DeleteLocationModalComponent } from './view-locations/components/delete-location-modal/delete-location-modal.component';
import { AddLocationWarningModalComponent } from './view-locations/components/add-location-warning-modal/add-location-warning-modal.component';

export * from './create-edit-location/container/create-edit-location.component';
export * from './view-locations/container/view-locations-container.component';
export * from './view-locations/components/delete-location-modal/delete-location-modal.component';
export * from './view-locations/components/delete-location-modal/delete-location-modal.component';
export * from './view-locations/components/add-location-warning-modal/add-location-warning-modal.component';

export const LOCATIONS_COMPONENTS = [
  ViewLocationsContainerComponent,
  CreateEditLocationComponent,
  LocationCardComponent,
  DeleteLocationModalComponent,
  AddLocationWarningModalComponent
];
