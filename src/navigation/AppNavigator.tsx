import React from 'react';

// redux
import {useTypedSelector} from '../hooks/useTypeSelector';
import {ReduxType} from '../models';

// navigators
import {MainNavigator} from './MainNavigator';
import {AuthNavigator} from './AuthNavigator';
import {SplashNavigator} from './SplashNavigator';

// nav
import {
  DefaultTheme,
  NavigationContainer,
  Theme,
} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';

// styles
import {Color} from '../styles';

// other deps
import Spinner from 'react-native-loading-spinner-overlay';

const MyTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: Color.bgFone,
    text: Color.secondary_900,
  },
};

export const AppNavigator = () => {
  const {currentScreen, loading} = useTypedSelector(state => state.navigation);

  return (
    <SafeAreaProvider style={{flex: 1}}>
      <NavigationContainer theme={MyTheme}>
        <Spinner visible={loading} />

        {currentScreen === ReduxType.AUTH && <AuthNavigator />}
        {currentScreen === ReduxType.MAIN && <MainNavigator />}
        {currentScreen === ReduxType.SPLASH && <SplashNavigator />}
      </NavigationContainer>
    </SafeAreaProvider>
  );
};
