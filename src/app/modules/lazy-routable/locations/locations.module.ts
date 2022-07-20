
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageCropperModule } from 'ngx-image-cropper';

import { SharedModule } from '@app/shared/shared.module';
import { AddLocationFormModule, TelInputModule, CloseModalBtnModule, BtnPanelModule } from '@app/modules/ui-elements';

import { MATERIAL_MODULES } from './constants/material-modules';
import { LOCATIONS_COMPONENTS } from './components';
import { PIPES } from './pipes';

import { LocationsRoutingModule } from './locations-routing.module';

@NgModule({
  declarations: [
    ...LOCATIONS_COMPONENTS,
    ...PIPES
  ],
  imports: [
    ...MATERIAL_MODULES,
    CommonModule,
    SharedModule,
    TelInputModule,
    ImageCropperModule,
    CloseModalBtnModule,
    BtnPanelModule,
    LocationsRoutingModule,
    AddLocationFormModule
  ],
  exports: [
    LocationsRoutingModule
  ]
})
export class LocationsModule { }
