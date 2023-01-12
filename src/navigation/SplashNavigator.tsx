import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

// screens
import {SplashScreen} from '../screens';

const Stack = createStackNavigator();

const SplashNavigator = () => (
  <Stack.Navigator
    initialRouteName="SplashScreen"
    screenOptions={{headerShown: false}}>
    <Stack.Screen name="SplashScreen" component={SplashScreen} />
  </Stack.Navigator>
);

export {SplashNavigator};
