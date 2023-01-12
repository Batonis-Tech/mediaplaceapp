import {ReduxType} from '../../models';

export function login(payload: any) {
  return {type: ReduxType.LOG_IN, payload};
}
