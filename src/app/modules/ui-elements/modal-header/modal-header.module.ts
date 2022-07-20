
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { ModalHeaderComponent } from './container/modal-header.component';

@NgModule({
  declarations: [
    ModalHeaderComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule
  ],
  exports: [
    ModalHeaderComponent
  ]
})
export class ModalHeaderModule { }
