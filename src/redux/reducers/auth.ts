import {ReduxType} from '../../models';

const initState = {
  currentUser: [],
};

export function authReducer(state = initState, action) {
  switch (action.type) {
    case ReduxType.LOG_IN:
      return {
        ...state,
        currentUser: action.payload,
      };
    default:
      return state;
  }
}
