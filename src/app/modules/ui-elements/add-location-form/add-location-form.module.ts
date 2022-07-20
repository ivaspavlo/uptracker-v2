
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MATERIAL_MODULES } from '@app/shared/constants';

import { TelInputModule } from '../tel-input/tel-input.module';
import { AddLocationFormComponent } from './container/add-location-form.component';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
  declarations: [
    AddLocationFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    TelInputModule,
    ...MATERIAL_MODULES
  ],
  exports: [
    AddLocationFormComponent
  ]
})
export class AddLocationFormModule { }
