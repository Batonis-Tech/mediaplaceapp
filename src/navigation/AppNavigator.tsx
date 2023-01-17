import React from 'react';

// redux
import {useTypedSelector} from '../hooks/useTypeSelector';
import {AppState, ReduxType} from '../models';

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
import {ErrorScreen} from '../screens';

const MyTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: Color.bgFone,
    text: Color.secondary_900,
  },
};

export const AppNavigator = () => {
  const {currentScreen, loading} = useTypedSelector(
    (state: AppState) => state.navigation,
  );

  const navigator = () => {
    switch (currentScreen) {
      case ReduxType.AUTH:
        return <AuthNavigator />;
      case ReduxType.MAIN:
        return <MainNavigator />;
      case ReduxType.SPLASH:
        return <SplashNavigator />;
      default:
        return <ErrorScreen />;
    }
  };

  return (
    <SafeAreaProvider style={{flex: 1}}>
      <NavigationContainer theme={MyTheme}>
        <Spinner visible={loading} />

        {navigator()}
      </NavigationContainer>
    </SafeAreaProvider>
  );
};
