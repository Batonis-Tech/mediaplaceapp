import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

// screens
import {AuthScreen} from '../screens';

const Stack = createStackNavigator();

const AuthNavigator = () => (
  <Stack.Navigator initialRouteName="AuthScreen">
    <Stack.Screen name="AuthScreen" component={AuthScreen} />
  </Stack.Navigator>
);

export {AuthNavigator};
