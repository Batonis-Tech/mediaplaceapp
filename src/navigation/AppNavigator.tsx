import React from 'react';

// redux
import {useSelector} from 'react-redux';
import {ReduxType} from '../models';

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
  const {currentScreen} = useSelector(state => state.navigation);

  const state = useSelector(state => state);
  console.log('state', state);

  return (
    <SafeAreaProvider style={{flex: 1}}>
      <NavigationContainer theme={MyTheme}>
        {currentScreen === ReduxType.AUTH && <AuthNavigator />}
        {currentScreen === ReduxType.MAIN && <MainNavigator />}
        {/* {currentScreen === 'SPLASH' && <MainNavigator />} */}
      </NavigationContainer>
    </SafeAreaProvider>
  );
};
