import {ReduxType} from './types';

export interface AppState {
  navigation: NavigatorState;
  user: AuthState;
}

export interface Action {
  type: string;
  payload?: any;
}

export interface ProfileInfo {
  data: {};
  role: 'user' | 'platform';
}

export interface AuthState {
  userData: {};
  currentAccount: {
    role: 'user' | 'platform';
    data: {
      id: number | undefined;
    };
  };
  balance: {} | null;
  providers: {
    result: any;
  };
  orders: any;
  orderDetails: {};
  access_token: string;
  refresh_token: string;
}

export interface NavigatorState {
  currentScreen: ReduxType;
  loading: boolean;
}
