import {ReduxType} from '../../models';

export function navigateAction(
  screen: ReduxType.AUTH | ReduxType.MAIN | ReduxType.SPLASH,
) {
  return {type: screen, payload: screen};
}

export function loadingAction(state: boolean) {
  return {
    type: state ? ReduxType.START_LOADING : ReduxType.STOP_LOADING,
  };
}

export function errorResponse() {
  return {type: ReduxType.ERROR};
}
