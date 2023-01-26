import React from 'react';
import {StatusBar} from 'react-native';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {
  MD3LightTheme as DefaultTheme,
  Provider as PaperProvider,
} from 'react-native-paper';

// redux
import {Provider} from 'react-redux';
import {store} from './src/redux/store';

// nav
import {AppNavigator} from './src/navigation/AppNavigator';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {OverlayProvider} from 'stream-chat-react-native';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'tomato',
    secondary: 'yellow',
  },
};

const App = () => {
  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <GestureHandlerRootView style={{flex: 1}}>
          <OverlayProvider>
            <BottomSheetModalProvider>
              <StatusBar
                backgroundColor="transparent"
                barStyle="dark-content"
                translucent
                animated={true}
              />

              <AppNavigator />
            </BottomSheetModalProvider>
          </OverlayProvider>
        </GestureHandlerRootView>
      </PaperProvider>
    </Provider>
  );
};

export default App;
