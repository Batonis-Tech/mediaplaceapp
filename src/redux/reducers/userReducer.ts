import {Action, AuthState, ReduxType} from '../../models';

const initState: AuthState = {
  userData: {},
  currentAccount: {role: 'user', data: null},
  balance: null,
  providers: null,
  orders: [],
  orderDetails: {},
  access_token: '',
  refresh_token: '',
};

export const userReducer = (state = initState, action: Action): AuthState => {
  switch (action.type) {
    case ReduxType.GET_ME:
      return {...state, userData: action.payload};
    case ReduxType.GET_PROFILE:
      return {...state, currentAccount: action.payload};
    case ReduxType.GET_BALANCE:
      return {...state, balance: action.payload};
    case ReduxType.GET_PROVIDERS:
      return {...state, providers: action.payload};
    case ReduxType.GET_ORDERS:
      return {...state, orders: action.payload};
    case ReduxType.GET_ORDERS_DETAILS:
      return {...state, orderDetails: action.payload};
    default:
      return state;
  }
};
