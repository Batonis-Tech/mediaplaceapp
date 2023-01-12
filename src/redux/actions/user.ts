import {ReduxType} from '../../models';

export function loginAction(payload: any) {
  return {type: ReduxType.LOG_IN, payload};
}

export function getOrders(payload: any) {
  // console.log('payload', payload);
  return {type: ReduxType.GET_ORDERS, payload};
}
