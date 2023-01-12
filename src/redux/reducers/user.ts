import {Action, AuthState, ReduxType} from '../../models';

const initState: AuthState = {
  user: {},
};

export const userReducer = (state = initState, action: Action): AuthState => {
  switch (action.type) {
    case ReduxType.LOG_IN:
      return {...state, user: action.payload};
    case ReduxType.LOG_OUT:
      return {...state, user: action.payload};
    default:
      return state;
  }
};
