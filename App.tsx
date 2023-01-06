import React, {type PropsWithChildren} from 'react';
import {SafeAreaView, StatusBar} from 'react-native';

import {Provider} from 'react-redux';

import {AppNavigator} from './src/navigation/AppNavigator';

import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {OrdersNav} from './src/navigation/mainNavigation/OrdersNav';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <>
      <StatusBar
        backgroundColor="transparent"
        barStyle="dark-content"
        translucent
        animated={true}
      />

      <AppNavigator />
    </>
  );
};

export default App;
