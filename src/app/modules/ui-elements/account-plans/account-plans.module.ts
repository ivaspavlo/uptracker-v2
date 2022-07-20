
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { COMPONENTS } from './components';
import { MATERIAL_MODULES } from './constants/material-modules';
import { ProgressBarModule } from '../progress-bar/progress-bar.module';
import { PlanPricePipe } from '@app/shared/pipes';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
  declarations: [
    ...COMPONENTS
  ],
  imports: [
    CommonModule,
    SharedModule,
    ProgressBarModule,
    ...MATERIAL_MODULES
  ],
  exports: [
    ...COMPONENTS
  ]
})
export class AccountPlansModule { }
