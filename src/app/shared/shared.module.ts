
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MATERIAL_MODULES } from './constants';
import { SHARED_COMPONENTS } from './components';
import { SHARED_PIPES } from './pipes';
import { SHARED_DIRECTIVES } from './directives';

@NgModule({
  declarations: [
    ...SHARED_PIPES,
    ...SHARED_COMPONENTS,
    ...SHARED_DIRECTIVES
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ...MATERIAL_MODULES
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    ...MATERIAL_MODULES,
    ...SHARED_PIPES,
    ...SHARED_COMPONENTS,
    ...SHARED_DIRECTIVES,
  ]
})
export class SharedModule { }
