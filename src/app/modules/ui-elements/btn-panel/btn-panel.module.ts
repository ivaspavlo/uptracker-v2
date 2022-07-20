
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

import { SharedModule } from '@app/shared/shared.module';
import { BtnPanelComponent } from './container/btn-panel.component';

@NgModule({
  declarations: [
    BtnPanelComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatButtonModule
  ],
  exports: [
    BtnPanelComponent
  ]
})
export class BtnPanelModule { }
