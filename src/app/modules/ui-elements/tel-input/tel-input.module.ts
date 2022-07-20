
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { NgxFlagPickerModule } from 'ngx-flag-picker';

import { MatInputModule } from '@angular/material/input';

import { MapDialCodePipe, KeysPipe } from './pipes';
import { TelInputComponent } from './container/tel-input.component';

@NgModule({
  declarations: [
    MapDialCodePipe,
    KeysPipe,
    TelInputComponent
  ],
  imports: [
    MatInputModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxFlagPickerModule
  ],
  exports: [
    TelInputComponent
  ]
})
export class TelInputModule { }
