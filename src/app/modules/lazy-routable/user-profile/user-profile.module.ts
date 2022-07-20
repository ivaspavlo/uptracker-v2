
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@app/shared/shared.module';
import { TelInputModule, EditImageModule, ModalHeaderModule } from '@app/modules/ui-elements';
import { UnsavedWarningModalModule } from '@app/modules/non-lazy-routable';

import { UserProfileRoutingModule } from './user-profile-routing.module';
import { UserProfileContainerComponent } from './container/user-profile-container.component';
import { USER_PROFILE_COMPONENTS } from './components';

@NgModule({
  declarations: [
    UserProfileContainerComponent,
    ...USER_PROFILE_COMPONENTS
  ],
  imports: [
    CommonModule,
    SharedModule,
    UnsavedWarningModalModule,
    UserProfileRoutingModule,
    TelInputModule,
    EditImageModule,
    ModalHeaderModule
  ]
})
export class UserProfileModule { }
