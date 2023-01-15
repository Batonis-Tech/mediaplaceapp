import {ReduxType} from '../../models';

export function loginAction(payload: any) {
  return {type: ReduxType.LOG_IN, payload};
}

export function saveUserInfo(payload: any) {
  return {type: ReduxType.GET_ME, payload};
}

export function getOrders(payload: any) {
  return {type: ReduxType.GET_ORDERS, payload};
}

export function getOrderDetails(payload: any) {
  return {type: ReduxType.GET_ORDERS_DETAILS, payload};
}
