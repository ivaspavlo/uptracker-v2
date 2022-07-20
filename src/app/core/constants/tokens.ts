
import { DOCUMENT } from '@angular/common';
import { inject, InjectionToken } from '@angular/core';

export const WINDOW = new InjectionToken<Window>(
  'An abstraction over global window object',
  {
    factory: () => {
      const { defaultView } = inject(DOCUMENT);
      if (!defaultView) { throw new Error('Window is not available'); }
      return defaultView;
    }
  }
);

export const SESSION_STORAGE = new InjectionToken<Storage>(
  'An abstraction over window.sessionStorage object',
  { factory: () => inject(WINDOW).sessionStorage }
);

export const LOCAL_STORAGE = new InjectionToken<Storage>(
  'An abstraction over window.localStorage object',
  { factory: () => inject(WINDOW).localStorage }
);

export const LOCATION = new InjectionToken<Location>(
  'An abstraction over window.location object',
  { factory: () => inject(WINDOW).location }
);
