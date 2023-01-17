import {ReduxType} from './types';

export interface AppState {
  navigation: NavigatorState;
  user: AuthState;
}

export interface Action {
  type: string;
  payload?: any;
}

export interface AuthState {
  user: {};
  providers: {};
  orders: any;
  openOrder: {};
  access_token: string;
  refresh_token: string;
}

export interface NavigatorState {
  currentScreen: ReduxType;
  loading: boolean;
}
