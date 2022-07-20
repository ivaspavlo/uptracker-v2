
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@app/shared/shared.module';
import { BtnPanelModule, ModalHeaderModule } from '@app/modules/ui-elements';

import { MATERIAL_MODULES } from './constants';
import { COMPONENTS } from './components';
import { UserManagementRoutingModule } from './user-management-routing.module';
import { UserManagementComponent } from './container/user-management.component';
import { FormatUsersTableDataPipe, GetLocationsIdArrayPipe } from './pipes';

@NgModule({
  declarations: [
    ...COMPONENTS,
    UserManagementComponent,
    FormatUsersTableDataPipe,
    GetLocationsIdArrayPipe
  ],
  imports: [
    ...MATERIAL_MODULES,
    CommonModule,
    SharedModule,
    ModalHeaderModule,
    BtnPanelModule,
    UserManagementRoutingModule
  ]
})
export class UserManagementModule { }
