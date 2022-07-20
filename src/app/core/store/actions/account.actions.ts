
import { createAction, props } from '@ngrx/store';
import { ResultState } from '@app/shared/constants';
import { IAccountUser, IInvitedUser, IAccountData, IGetTokenReq, IPaymentMethod, IStripeFailureRes } from '@app/interfaces';
import { IGetAccountUsersReq, IUpdateAccountUserReq, IArchiveAccountUserReq, IArchiveAccountUserRes, IGetArchivedUsersReq, IReactivateAccountUserRes, IInviteUserReq, IEditInviteUserReq, IDeleteInviteUserReq } from '@app/core/services';

export enum ACTION_TYPES {

  // CORE ACCOUNT

  GET_ACCOUNT_PROFILE_DATA = '[CORE ACCOUNT] Get Account Profile Data',
  GET_ACCOUNT_PROFILE_DATA_SUCCESS = '[CORE ACCOUNT] Get Account Profile Data Success',
  GET_ACCOUNT_PROFILE_DATA_FAILURE = '[CORE ACCOUNT] Get Account Profile Data Failure',

  GET_ACCOUNT_PLANS = '[CORE ACCOUNT] Get Account Plans',
  GET_ACCOUNT_PLANS_SUCCESS = '[CORE ACCOUNT] Get Account Plans Success',
  GET_ACCOUNT_PLANS_FAILURE = '[CORE ACCOUNT] Get Account Plans Failure',

  GET_CURRENT_ACCOUNT_PLAN = '[CORE ACCOUNT] Get Current Account Plan',
  GET_CURRENT_ACCOUNT_PLAN_SUCCESS = '[CORE ACCOUNT] Get Current Account Plan Success',
  GET_CURRENT_ACCOUNT_PLAN_FAILURE = '[CORE ACCOUNT] Get Current Account Plan Failure',

  SET_ACCOUNT_PAYMENT_METHOD = '[CORE ACCOUNT] Set Payment Method',
  SET_ACCOUNT_PAYMENT_METHOD_SUCCESS = '[CORE ACCOUNT] Set Payment Method Success',
  SET_ACCOUNT_PAYMENT_METHOD_FAILURE = '[CORE ACCOUNT] Set Payment Method Failure',

  // ACCOUNT USERS

  GET_ACCOUNT_USERS = '[CORE ACCOUNT] Get Account Users',
  GET_ACCOUNT_USERS_SUCCESS = '[CORE ACCOUNT] Get Account Users Success',
  GET_ACCOUNT_USERS_FAILURE = '[CORE ACCOUNT] Get Account Users Failure',

  UPDATE_ACCOUNT_USER = '[CORE ACCOUNT] Update Account User',
  UPDATE_ACCOUNT_USER_SUCCESS = '[CORE ACCOUNT] Update Account User Success',
  UPDATE_ACCOUNT_USER_FAILURE = '[CORE ACCOUNT] Update Account User Failure',

  ARCHIVE_ACCOUNT_USER = '[CORE ACCOUNT] Archive Account User',
  ARCHIVE_ACCOUNT_USER_SUCCESS = '[CORE ACCOUNT] Archive Account User Success',
  ARCHIVE_ACCOUNT_USER_FAILURE = '[CORE ACCOUNT] Archive Account User Failure',

  REACTIVATE_ACCOUNT_USER = '[CORE ACCOUNT] Reactivate Account User',
  REACTIVATE_ACCOUNT_USER_SUCCESS = '[CORE ACCOUNT] Reactivate Account User Success',
  REACTIVATE_ACCOUNT_USER_FAILURE = '[CORE ACCOUNT] Reactivate Account User Failure',

  // INVITE USERS

  GET_INVITED_USERS = '[CORE ACCOUNT] Get Invited Users',
  GET_INVITED_USERS_SUCCESS = '[CORE ACCOUNT] Get Invited Users Success',
  GET_INVITED_USERS_FAILURE = '[CORE ACCOUNT] Get Invited Users Failure',

  GET_ARCHIVED_USERS = '[CORE ACCOUNT] Get Archived Users',
  GET_ARCHIVED_USERS_SUCCESS = '[CORE ACCOUNT] Get Archived Users Success',
  GET_ARCHIVED_USERS_FAILURE = '[CORE ACCOUNT] Get Archived Users Failure',

  INVITE_USER = '[CORE ACCOUNT] Invite User',
  INVITE_USER_SUCCESS = '[CORE ACCOUNT] Invite User Success',
  INVITE_USER_FAILURE = '[CORE ACCOUNT] Invite User Failure',

  EDIT_INVITE_USER = '[CORE ACCOUNT] Edit Invite User',
  EDIT_INVITE_USER_SUCCESS = '[CORE ACCOUNT] Edit Invite User Success',
  EDIT_INVITE_USER_FAILURE = '[CORE ACCOUNT] Edit Invite User Failure',

  DELETE_INVITE_USER = '[CORE ACCOUNT] Delete User Invitation',
  DELETE_INVITE_USER_SUCCESS = '[CORE ACCOUNT] Delete User Invitation Success',
  DELETE_INVITE_USER_FAILURE = '[CORE ACCOUNT] Delete User Invitation Failure'
}

// CORE ACCOUNT

export const getAccountProfileDataAction = createAction(ACTION_TYPES.GET_ACCOUNT_PROFILE_DATA);
export const getAccountProfileDataSuccessAction = createAction(ACTION_TYPES.GET_ACCOUNT_PROFILE_DATA_SUCCESS, props<ResultState<IAccountData>>());
export const getAccountProfileDataFailureAction = createAction(ACTION_TYPES.GET_ACCOUNT_PROFILE_DATA_FAILURE, props<ResultState<null>>());

export const getAccountPlansAction = createAction(ACTION_TYPES.GET_ACCOUNT_PLANS);
export const getAccountPlansSuccessAction = createAction(ACTION_TYPES.GET_ACCOUNT_PLANS_SUCCESS, props<ResultState<any>>());
export const getAccountPlansFailureAction = createAction(ACTION_TYPES.GET_ACCOUNT_PLANS_FAILURE, props<ResultState<null>>());

export const getСurrentAccountPlanAction = createAction(ACTION_TYPES.GET_CURRENT_ACCOUNT_PLAN);
export const getСurrentAccountPlanSuccessAction = createAction(ACTION_TYPES.GET_CURRENT_ACCOUNT_PLAN_SUCCESS, props<ResultState<any>>());
export const getСurrentAccountPlanFailureAction = createAction(ACTION_TYPES.GET_CURRENT_ACCOUNT_PLAN_FAILURE, props<ResultState<null>>());

export const setAccountPaymentMethodAction = createAction(ACTION_TYPES.SET_ACCOUNT_PAYMENT_METHOD, props<IGetTokenReq>());
export const setAccountPaymentMethodSuccessAction = createAction(ACTION_TYPES.SET_ACCOUNT_PAYMENT_METHOD_SUCCESS, props<ResultState<{ payment_methods: IPaymentMethod[]; stripe_error: IStripeFailureRes; }>>());
export const setAccountPaymentMethodFailureAction = createAction(ACTION_TYPES.SET_ACCOUNT_PAYMENT_METHOD_FAILURE, props<ResultState<null>>());

// ACCOUNT USERS

export const getAccountUsersAction = createAction(ACTION_TYPES.GET_ACCOUNT_USERS, props<IGetAccountUsersReq>());
export const getAccountUsersSuccessAction = createAction(ACTION_TYPES.GET_ACCOUNT_USERS_SUCCESS, props<ResultState<IAccountUser[]>>());
export const getAccountUsersFailureAction = createAction(ACTION_TYPES.GET_ACCOUNT_USERS_FAILURE, props<ResultState<null>>());

export const updateAccountUserAction = createAction(ACTION_TYPES.UPDATE_ACCOUNT_USER, props<IUpdateAccountUserReq>());
export const updateAccountUserSuccessAction = createAction(ACTION_TYPES.UPDATE_ACCOUNT_USER_SUCCESS, props<ResultState<any[]>>());
export const updateAccountUserFailureAction = createAction(ACTION_TYPES.UPDATE_ACCOUNT_USER_FAILURE, props<ResultState<null>>());

export const archiveAccountUserAction = createAction(ACTION_TYPES.ARCHIVE_ACCOUNT_USER, props<IArchiveAccountUserReq>());
export const archiveAccountUserSuccessAction = createAction(ACTION_TYPES.ARCHIVE_ACCOUNT_USER_SUCCESS, props<ResultState<IArchiveAccountUserRes>>());
export const archiveAccountUserFailureAction = createAction(ACTION_TYPES.ARCHIVE_ACCOUNT_USER_FAILURE, props<ResultState<null>>());

export const getArchivedUsersAction = createAction(ACTION_TYPES.GET_ARCHIVED_USERS, props<IGetArchivedUsersReq>());
export const getArchivedUsersSuccessAction = createAction(ACTION_TYPES.GET_ARCHIVED_USERS_SUCCESS, props<ResultState<IAccountUser[]>>());
export const getArchivedUsersFailureAction = createAction(ACTION_TYPES.GET_ARCHIVED_USERS_FAILURE, props<ResultState<null>>());

export const reactivateAccountUserAction = createAction(ACTION_TYPES.REACTIVATE_ACCOUNT_USER, props<IUpdateAccountUserReq>());
export const reactivateAccountUserSuccessAction = createAction(ACTION_TYPES.REACTIVATE_ACCOUNT_USER_SUCCESS, props<ResultState<IReactivateAccountUserRes>>());
export const reactivateAccountUserFailureAction = createAction(ACTION_TYPES.REACTIVATE_ACCOUNT_USER_FAILURE, props<ResultState<null>>());

// INVITE USERS

export const getInvitedUsersAction = createAction(ACTION_TYPES.GET_INVITED_USERS, props<{location_id: string}>());
export const getInvitedUsersSuccessAction = createAction(ACTION_TYPES.GET_INVITED_USERS_SUCCESS, props<ResultState<IInvitedUser[]>>());
export const getInvitedUsersFailureAction = createAction(ACTION_TYPES.GET_INVITED_USERS_FAILURE, props<ResultState<null>>());

export const inviteUserAction = createAction(ACTION_TYPES.INVITE_USER, props<IInviteUserReq>());
export const inviteUserSuccessAction = createAction(ACTION_TYPES.INVITE_USER_SUCCESS, props<ResultState<IInvitedUser[]>>());
export const inviteUserFailureAction = createAction(ACTION_TYPES.INVITE_USER_FAILURE, props<ResultState<null>>());

export const editInviteUserAction = createAction(ACTION_TYPES.EDIT_INVITE_USER, props<IEditInviteUserReq>());
export const editInviteUserSuccessAction = createAction(ACTION_TYPES.EDIT_INVITE_USER_SUCCESS, props<ResultState<IInvitedUser[]>>());
export const editInviteUserFailureAction = createAction(ACTION_TYPES.EDIT_INVITE_USER_FAILURE, props<ResultState<null>>());

export const deleteInviteUserAction = createAction(ACTION_TYPES.DELETE_INVITE_USER, props<IDeleteInviteUserReq>());
export const deleteInviteUserSuccessAction = createAction(ACTION_TYPES.DELETE_INVITE_USER_SUCCESS, props<ResultState<IInvitedUser[]>>());
export const deleteInviteUserFailureAction = createAction(ACTION_TYPES.DELETE_INVITE_USER_FAILURE, props<ResultState<null>>());
