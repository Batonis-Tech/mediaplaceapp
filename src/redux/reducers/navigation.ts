import {ReduxType} from '../../models';

const initState = {
  currentScreen: ReduxType.AUTH,
  loading: false,
};

export function navigationReducers(state = initState, action) {
  switch (action.type) {
    case ReduxType.SPLASH:
      return {...state, currentScreen: ReduxType.SPLASH};
    case ReduxType.AUTH:
      return {...state, currentScreen: ReduxType.AUTH};
    case ReduxType.MAIN:
      return {...state, currentScreen: ReduxType.MAIN};
    default:
      return state;
  }
}
