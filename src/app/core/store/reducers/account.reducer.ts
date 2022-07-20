
import { createReducer, on, Action } from '@ngrx/store';
import { IAccountUser, IInvitedUser, IAccountData, IAccountPlan, IPaymentMethod, IStripeFailureRes } from '@app/interfaces';
import { ResultState, LoadingState } from '@app/shared/constants';
import { IArchiveAccountUserRes, IReactivateAccountUserRes } from '@app/core/services';

import * as AuthActions from '../actions/auth.actions';
import * as AccountActions from '../actions/account.actions';

export interface IAccountState {
  account_profile_data: IAccountData;
  account_plans: IAccountPlan[];
  current_account_plan: any;
  account_users: IAccountUser[];
  invited_users: IInvitedUser[];
  archived_users: IAccountUser[];
}

const initialState = {
  account_profile_data: null,
  account_plans: null,
  current_account_plan: null,
  account_users: null,
  invited_users: null,
  archived_users: null
};

const accountReducer = createReducer<IAccountState, Action>(
  initialState,

  on(AuthActions.logoutSuccessAction, _ => (initialState)),

  // CORE ACCOUNT

  on(AccountActions.getAccountProfileDataAction, (state: IAccountState) => ({ ...state, callState: LoadingState.LOADING })),
  on(AccountActions.getAccountProfileDataSuccessAction, (state: IAccountState, { result, callState }: ResultState<IAccountData>) => ({ ...state, account_profile_data: result, callState })),
  on(AccountActions.getAccountProfileDataFailureAction, (state: IAccountState, { callState }: ResultState<null>) => ({ ...state, callState })),

  on(AccountActions.getAccountPlansAction, (state: IAccountState) => ({ ...state, callState: LoadingState.LOADING })),
  on(AccountActions.getAccountPlansSuccessAction, (state: IAccountState, { result, callState }: ResultState<IAccountPlan[]>) => ({ ...state, account_plans: result, callState })),
  on(AccountActions.getAccountPlansFailureAction, (state: IAccountState, { callState }: ResultState<null>) => ({ ...state, callState })),

  on(AccountActions.getСurrentAccountPlanAction, (state: IAccountState) => ({ ...state, callState: LoadingState.LOADING })),
  on(AccountActions.getСurrentAccountPlanSuccessAction, (state: IAccountState, { result, callState }: ResultState<any>) => ({ ...state, current_account_plan: result, callState })),
  on(AccountActions.getСurrentAccountPlanFailureAction, (state: IAccountState, { callState }: ResultState<null>) => ({ ...state, callState })),

  on(AccountActions.setAccountPaymentMethodAction, (state: IAccountState) => ({ ...state, callState: LoadingState.LOADING })),
  on(AccountActions.setAccountPaymentMethodSuccessAction, (state: IAccountState, { result, callState }: ResultState<{ payment_methods: IPaymentMethod[]; stripe_error: IStripeFailureRes; }>) => ({ ...state, account_profile_data: { ...state.account_profile_data, ...result }, callState })),
  on(AccountActions.setAccountPaymentMethodFailureAction, (state: IAccountState, { callState }: ResultState<null>) => ({ ...state, callState })),

  // ACCOUNT USERS

  on(AccountActions.getAccountUsersAction, (state: IAccountState) => ({ ...state, callState: LoadingState.LOADING })),
  on(AccountActions.getAccountUsersSuccessAction, (state: IAccountState, { result, callState }: ResultState<IAccountUser[]>) => ({ ...state, account_users: result, callState })),
  on(AccountActions.getAccountUsersFailureAction, (state: IAccountState, { callState }: ResultState<null>) => ({ ...state, callState })),

  on(AccountActions.updateAccountUserAction, (state: IAccountState) => ({ ...state, callState: LoadingState.LOADING })),
  on(AccountActions.updateAccountUserSuccessAction, (state: IAccountState, { result, callState }: ResultState<IAccountUser[]>) => ({ ...state, account_users: result, callState })),
  on(AccountActions.updateAccountUserFailureAction, (state: IAccountState, { callState }: ResultState<null>) => ({ ...state, callState })),

  on(AccountActions.archiveAccountUserAction, (state: IAccountState) => ({ ...state, callState: LoadingState.LOADING })),
  on(AccountActions.archiveAccountUserSuccessAction, (state: IAccountState, { result, callState }: ResultState<IArchiveAccountUserRes>) => ({ ...state, ...result, callState })),
  on(AccountActions.archiveAccountUserFailureAction, (state: IAccountState, { callState }: ResultState<null>) => ({ ...state, callState })),

  on(AccountActions.getArchivedUsersAction, (state: IAccountState) => ({ ...state, callState: LoadingState.LOADING })),
  on(AccountActions.getArchivedUsersSuccessAction, (state: IAccountState, { result, callState }: ResultState<IAccountUser[]>) => ({ ...state, archived_users: result, callState })),
  on(AccountActions.getArchivedUsersFailureAction, (state: IAccountState, { callState }: ResultState<null>) => ({ ...state, callState })),

  on(AccountActions.reactivateAccountUserAction, (state: IAccountState) => ({ ...state, callState: LoadingState.LOADING })),
  on(AccountActions.reactivateAccountUserSuccessAction, (state: IAccountState, { result, callState }: ResultState<IReactivateAccountUserRes>) => ({ ...state, ...result, callState })),
  on(AccountActions.reactivateAccountUserFailureAction, (state: IAccountState, { callState }: ResultState<null>) => ({ ...state, callState })),

  // INVITED USERS

  on(AccountActions.getInvitedUsersAction, (state: IAccountState) => ({ ...state, callState: LoadingState.LOADING })),
  on(AccountActions.getInvitedUsersSuccessAction, (state: IAccountState, { result, callState }: ResultState<IInvitedUser[]>) => ({ ...state, invited_users: result, callState })),
  on(AccountActions.getInvitedUsersFailureAction, (state: IAccountState, { callState }: ResultState<null>) => ({ ...state, callState })),

  on(AccountActions.inviteUserAction, (state: IAccountState) => ({ ...state, callState: LoadingState.LOADING })),
  on(AccountActions.inviteUserSuccessAction, (state: IAccountState, { result, callState }: ResultState<IInvitedUser[]>) => ({ ...state, invited_users: result, callState })),
  on(AccountActions.inviteUserFailureAction, (state: IAccountState, { callState }: ResultState<null>) => ({ ...state, callState })),

  on(AccountActions.editInviteUserAction, (state: IAccountState) => ({ ...state, callState: LoadingState.LOADING })),
  on(AccountActions.editInviteUserSuccessAction, (state: IAccountState, { result, callState }: ResultState<IInvitedUser[]>) => ({ ...state, invited_users: result, callState })),
  on(AccountActions.editInviteUserFailureAction, (state: IAccountState, { callState }: ResultState<null>) => ({ ...state, callState })),

  on(AccountActions.deleteInviteUserAction, (state: IAccountState) => ({ ...state, callState: LoadingState.LOADING })),
  on(AccountActions.deleteInviteUserSuccessAction, (state: IAccountState, { result, callState }: ResultState<IInvitedUser[]>) => ({ ...state, invited_users: result, callState })),
  on(AccountActions.deleteInviteUserFailureAction, (state: IAccountState, { callState }: ResultState<null>) => ({ ...state, callState }))

);

export default function(state: IAccountState, action: Action) {
  return accountReducer(state, action);
}
