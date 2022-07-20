
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BtnPanelModule, ModalHeaderModule, CloseModalBtnModule } from '@app/modules/ui-elements';
import { UnsavedWarningModalComponent } from './container/unsaved-warning-modal.component';

@NgModule({
  declarations: [
    UnsavedWarningModalComponent
  ],
  imports: [
    CommonModule,
    BtnPanelModule,
    ModalHeaderModule,
    CloseModalBtnModule
  ],
  exports: [
    UnsavedWarningModalComponent
  ]
})
export class UnsavedWarningModalModule { }
