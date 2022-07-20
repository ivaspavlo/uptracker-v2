
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { CoreRoutingModule } from './core-routing.module';
import { coreModuleState, coreModuleStateToken, metaReducers } from './store/reducers';

import { CORE_COMPONENTS } from './components';
import { CORE_DIRECTIVES } from './directives';
import { CORE_EFFECTS } from './store/effects';
import { MATERIAL_MODULES } from './constants';

@NgModule({
  declarations: [
    ...CORE_DIRECTIVES,
    ...CORE_COMPONENTS
  ],
  imports: [
    CommonModule,
    FormsModule,
    CoreRoutingModule,
    StoreModule.forRoot(coreModuleStateToken, { metaReducers }),
    StoreDevtoolsModule.instrument({ maxAge: 25 }),
    EffectsModule.forRoot(CORE_EFFECTS),
    ...MATERIAL_MODULES
  ],
  providers: [
    { provide: coreModuleStateToken, useValue: coreModuleState }
  ],
  exports: [
    CoreRoutingModule
  ]
})
export class CoreModule {
  constructor(
    @Optional() @SkipSelf() parentModule: CoreModule
  ) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import available only in AppModule');
    }
  }
}
