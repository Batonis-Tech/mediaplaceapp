import {ReduxType} from '../../models';

export function navigate(screen: ReduxType) {
  return {type: screen, payload: screen};
}

export function loading(state: boolean) {
  return {
    type: state ? ReduxType.START_LOADING : ReduxType.STOP_LOADING,
  };
}
