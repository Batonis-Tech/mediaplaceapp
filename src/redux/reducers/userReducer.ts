import {Action, AuthState, ReduxType} from '../../models';

const initState: AuthState = {
  userData: {},
  currentAccount: {role: 'user', data: null},
  balance: null,
  providers: null,
  orders: null,
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
    case ReduxType.SAVE_PUBLICATION_URL:
      return {
        ...state,
        orderDetails: {
          ...state.orderDetails,
          publication_url: action.payload,
        },
      };
    case ReduxType.SAVE_QUILL_SOLUTION:
      return {
        ...state,
        orderDetails: {
          ...state.orderDetails,
          quill_solution: action.payload,
        },
      };
    case ReduxType.SAVE_QUILL_TASK:
      return {
        ...state,
        orderDetails: {
          ...state.orderDetails,
          quill_task: action.payload,
        },
      };
    case ReduxType.GET_ORDERS_DETAILS:
      return {...state, orderDetails: action.payload};
    default:
      return state;
  }
};
