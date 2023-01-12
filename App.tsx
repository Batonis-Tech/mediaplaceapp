import React from 'react';
import {StatusBar} from 'react-native';

// redux
import {Provider} from 'react-redux';
import {store} from './src/redux/store';

// nav
import {AppNavigator} from './src/navigation/AppNavigator';

const App = () => {
  return (
    <Provider store={store}>
      <StatusBar
        backgroundColor="transparent"
        barStyle="dark-content"
        translucent
        animated={true}
      />

      <AppNavigator />
    </Provider>
  );
};

export default App;
