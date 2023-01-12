import {applyMiddleware, combineReducers, createStore} from 'redux';
import ReduxThunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';

import {userReducer, navigationReducers} from './reducers';

const rootReducer = combineReducers({
  user: userReducer,
  navigation: navigationReducers,
});

export type RootReducer = ReturnType<typeof rootReducer>;

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(ReduxThunk)),
);
