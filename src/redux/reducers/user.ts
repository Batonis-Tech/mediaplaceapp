import {Action, AuthState, ReduxType} from '../../models';

const initState: AuthState = {
  user: {
    info: {},
    providers: {},
  },
  orders: [],
  access_token: '',
  refresh_token: '',
};

export const userReducer = (state = initState, action: Action): AuthState => {
  switch (action.type) {
    case ReduxType.LOG_IN:
      return {...state, access_token: action.payload};
    case ReduxType.LOG_OUT:
      return {...state, user: action.payload};
    case ReduxType.GET_ORDERS:
      return {...state, orders: action.payload};
    default:
      return state;
  }
};
