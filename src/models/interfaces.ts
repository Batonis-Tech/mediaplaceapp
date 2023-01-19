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
  userData: {
    id: number | undefined;
    chat_user_id: string;
    name: string;
    chat_token: string;
  };
  currentAccount: {
    role: 'user' | 'platform';
    data: {
      id: number | undefined;
      chat_user_id: string;
      name: string;
      chat_token: string;
    };
  };
  balance: {} | null;
  providers: {
    result: any;
  };
  orders: any;
  orderDetails: any;
  access_token: string;
  refresh_token: string;
}

export interface NavigatorState {
  currentScreen: ReduxType;
  loading: boolean;
}
