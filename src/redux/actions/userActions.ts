import {ProfileInfo, ReduxType} from '../../models';

export function saveUserInfo(payload: any) {
  return {type: ReduxType.GET_ME, payload};
}

export function saveProfileInfo(payload: ProfileInfo) {
  return {type: ReduxType.GET_PROFILE, payload};
}

// user
export function getOrders(payload: []) {
  return {type: ReduxType.GET_ORDERS, payload};
}

export function getOrderDetails(payload: any) {
  return {type: ReduxType.GET_ORDERS_DETAILS, payload};
}

export function getBalance(payload: any) {
  return {type: ReduxType.GET_BALANCE, payload};
}

export function getProviders(payload: any) {
  return {type: ReduxType.GET_PROVIDERS, payload};
}
