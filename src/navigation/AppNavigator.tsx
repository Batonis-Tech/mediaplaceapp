import React from 'react';

// navigators
import {MainNavigator} from './MainNavigator';
import {AuthNavigator} from './AuthNavigator';

// nav
import {
  DefaultTheme,
  NavigationContainer,
  Theme,
} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';

// styles
import {Color} from '../styles';

const MyTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: Color.bgFone,
    text: Color.secondary_900,
  },
};

export const AppNavigator = (props: any) => {
  //   const {
  //     currentScreen: navigator,
  //     loading,
  //     parameters,
  //   } = useSelector((state: AppState) => state.navigation);

  return (
    <SafeAreaProvider style={{flex: 1}}>
      <NavigationContainer theme={MyTheme}>
        <MainNavigator />

        {/* <AuthNavigator/> */}
      </NavigationContainer>
    </SafeAreaProvider>
  );
};
