import {ReduxType} from './types';

export interface Action {
  type: string;
  payload?: any;
}

export interface AuthState {
  user: {};
}

export interface NavigatorState {
  currentScreen: ReduxType;
  loading: boolean;
}
