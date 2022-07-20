
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@app/shared/shared.module';

import { MATERIAL_MODULES } from './constants';
import { AUTH_COMPONENTS } from './components';
import { PIPES } from './pipes';
import { AuthContainerComponent } from './container/auth-container.component';

import { AuhRoutingModule } from './auth-routing.module';

@NgModule({
  declarations: [
    AuthContainerComponent,
    ...PIPES,
    ...AUTH_COMPONENTS
  ],
  imports: [
    CommonModule,
    AuhRoutingModule,
    SharedModule,
    ...MATERIAL_MODULES
  ],
  exports: [
    AuhRoutingModule
  ]
})
export class AuthModule { }
