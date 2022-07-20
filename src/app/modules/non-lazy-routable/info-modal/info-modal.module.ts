
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InfoModalComponent } from './container/info-modal.component';
import { BtnPanelModule, ModalHeaderModule, CloseModalBtnModule } from '@app/modules/ui-elements';

@NgModule({
  declarations: [
    InfoModalComponent
  ],
  imports: [
    CommonModule,
    BtnPanelModule,
    ModalHeaderModule,
    CloseModalBtnModule
  ],
  exports: [
    InfoModalComponent
  ]
})
export class InfoModalModule { }
