
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CloseModalBtnComponent } from './container/close-modal-btn.component';

@NgModule({
  declarations: [
    CloseModalBtnComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    CloseModalBtnComponent
  ]
})
export class CloseModalBtnModule { }
