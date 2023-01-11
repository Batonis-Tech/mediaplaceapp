import {applyMiddleware, combineReducers, createStore} from 'redux';
//import thunk from 'redux-thunk';
import ReduxThunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';

import {authReducer, navigationReducers} from './reducers';

const rootReducer = combineReducers({
  auth: authReducer,
  navigation: navigationReducers,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(ReduxThunk)),
);

//const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
