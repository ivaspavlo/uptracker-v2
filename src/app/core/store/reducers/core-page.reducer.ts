
import { Action, createReducer, on } from '@ngrx/store';
import { SIDEBAR_COLLAPSED_KEY, ResultState } from '@app/shared/constants';
import { IRole, ICurrency } from '@app/interfaces';
import * as CorePageActions from '@app/core/store/actions/core-page.actions';


export interface ICorePageState {
  [SIDEBAR_COLLAPSED_KEY]: boolean;
  roles: IRole[];
  currencies: ICurrency[];
}

const initialState: ICorePageState = {
  [SIDEBAR_COLLAPSED_KEY]: true,
  roles: null,
  currencies: null
};

const corePageReducer = createReducer<ICorePageState, Action>(
  initialState,

  on(CorePageActions.switchSidebarAction, (state: ICorePageState) => ({ ...state, [SIDEBAR_COLLAPSED_KEY]: !state[SIDEBAR_COLLAPSED_KEY] })),
  on(CorePageActions.getRolesSuccessAction, (state: ICorePageState, { result }: ResultState<IRole[]>) => ({ ...state, roles: result })),
  on(CorePageActions.getCurrenciesSuccessAction, (state: ICorePageState, { result }: ResultState<ICurrency[]>) => ({ ...state, currencies: result }))
);

export default function(state: ICorePageState = initialState, action: Action) {
  return corePageReducer(state, action);
}
