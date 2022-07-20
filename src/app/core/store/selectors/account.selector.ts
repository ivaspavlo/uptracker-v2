
import { createSelector } from '@ngrx/store';
import { IAccountState } from '../reducers/account.reducer';
import { ICoreModuleState } from '../reducers';
import { get } from '@app/shared/helpers';

export const selectAccountState = (state: ICoreModuleState): IAccountState => state.account;

export const selectAccountProfileData = createSelector(
  selectAccountState,
  (state: IAccountState) => state.account_profile_data
);

export const selectAccountPlans = createSelector(
  selectAccountState,
  (state: IAccountState) => state.account_plans
);

export const selectCurrentAccountPlan = createSelector(
  selectAccountState,
  (state: IAccountState) => state.current_account_plan
);

export const selectAccountUsers = createSelector(
  selectAccountState,
  (state: IAccountState) => state.account_users
);

export const selectInvitedUsers = createSelector(
  selectAccountState,
  (state: IAccountState) => state.invited_users
);

export const selectArchivedUsers = createSelector(
  selectAccountState,
  (state: IAccountState) => state.archived_users
);

export const selectAccountData = createSelector(
  selectAccountState,
  (state: IAccountState) => state.account_profile_data
);

export const selectAccountPaymentData = createSelector(
  selectAccountState,
  (state: IAccountState) => ({
    payment_methods: get(state, 'account_profile_data.payment_methods', null),
    stripe_error: get(state, 'account_profile_data.stripe_error', null)
  })
);
