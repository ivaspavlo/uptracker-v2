
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppFileInputComponent } from './file-input/file-input.component';
import { MATERIAL_MODULES } from './constants';

@NgModule({
  declarations: [
    AppFileInputComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ...MATERIAL_MODULES
  ],
  exports: [
    AppFileInputComponent
  ]
})
export class FileInputModule { }
