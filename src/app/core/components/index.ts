
export * from './core-page/core-page.component';
export * from './header/header-container.component';

import { CorePageComponent } from './core-page/core-page.component';
import { HEADER_COMPONENTS } from './header';
import { SIDEBAR_COMPONENTS } from './sidebar';

export const CORE_COMPONENTS = [
  CorePageComponent,
  HEADER_COMPONENTS,
  SIDEBAR_COMPONENTS
];
