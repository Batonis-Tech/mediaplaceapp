import React from 'react';

//
import {MainNavigator} from './MainNavigator';

// nav
import {
  DefaultTheme,
  NavigationContainer,
  Theme,
} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';

export const AppNavigator = (props: any) => {
  //   const {
  //     currentScreen: navigator,
  //     loading,
  //     parameters,
  //   } = useSelector((state: AppState) => state.navigation);

  return (
    <SafeAreaProvider style={{flex: 1}}>
      <NavigationContainer>
        <MainNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};
