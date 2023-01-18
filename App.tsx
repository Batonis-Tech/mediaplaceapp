import React from 'react';
import {StatusBar} from 'react-native';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';

// redux
import {Provider} from 'react-redux';
import {store} from './src/redux/store';

// nav
import {AppNavigator} from './src/navigation/AppNavigator';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const App = () => {
  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{flex: 1}}>
        <BottomSheetModalProvider>
          <StatusBar
            backgroundColor="transparent"
            barStyle="dark-content"
            translucent
            animated={true}
          />

          <AppNavigator />
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </Provider>
  );
};

export default App;
