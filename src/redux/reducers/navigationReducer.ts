import {Action, NavigatorState, ReduxType} from '../../models';

const initState: NavigatorState = {
  currentScreen: ReduxType.SPLASH,
  loading: false,
};

export function navigationReducers(state = initState, action: Action) {
  switch (action.type) {
    case ReduxType.SPLASH:
      return {...state, currentScreen: ReduxType.SPLASH};
    case ReduxType.AUTH:
      return {...state, currentScreen: ReduxType.AUTH};
    case ReduxType.MAIN:
      return {...state, currentScreen: ReduxType.MAIN};
    case ReduxType.ERROR:
      return {...state, currentScreen: ReduxType.ERROR};
    case ReduxType.STOP_LOADING:
      return {...state, loading: false};
    case ReduxType.START_LOADING:
      return {...state, loading: true};
    default:
      return state;
  }
}
