import {ReduxType} from './types';

export interface Action {
  type: string;
  payload?: any;
}

export interface AuthState {
  user: {};
  orders: any;
  access_token: string;
  refresh_token: string;
}

export interface NavigatorState {
  currentScreen: ReduxType;
  loading: boolean;
}