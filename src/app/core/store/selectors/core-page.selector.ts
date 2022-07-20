
import { createSelector } from '@ngrx/store';
import { ICoreModuleState } from '../reducers';
import { ICorePageState } from '../reducers/core-page.reducer';

export const selectCorePage = (state: ICoreModuleState) => state.corePage;

export const selectSidebarCollapsed = createSelector(
  selectCorePage,
  (state: ICorePageState) => state.isSidebarCollapsed
);

export const selectRoles = createSelector(
  selectCorePage,
  (state: ICorePageState) => state.roles
);

export const selectCurrencies = createSelector(
  selectCorePage,
  (state: ICorePageState) => state.currencies
);
