import {ReduxType} from '../../models';

export function navigateAction(screen: ReduxType) {
  return {type: screen, payload: screen};
}

export function loadingAction(state: boolean) {
  return {
    type: state ? ReduxType.START_LOADING : ReduxType.STOP_LOADING,
  };
}
