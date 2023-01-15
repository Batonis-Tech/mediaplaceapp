import {Action, AuthState, ReduxType} from '../../models';

const initState: AuthState = {
  user: {},
  providers: {},
  orders: [],
  openOrder: {},
  access_token: '',
  refresh_token: '',
};

export const userReducer = (state = initState, action: Action): AuthState => {
  switch (action.type) {
    case ReduxType.LOG_IN:
      return {...state, access_token: action.payload};
    case ReduxType.LOG_OUT:
      return {...state, access_token: action.payload};
    case ReduxType.GET_ME:
      return {...state, user: action.payload};
    case ReduxType.GET_ORDERS:
      return {...state, orders: action.payload};
    case ReduxType.GET_ORDERS_DETAILS:
      return {...state, openOrder: action.payload};
    default:
      return state;
  }
};
