import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

// screens
import {SettingsScreen} from '../../screens';

const Stack = createStackNavigator();

export const SettingsNav = () => (
  <Stack.Navigator initialRouteName="OrdersScreen">
    <Stack.Screen
      name="SettingsScreen"
      component={SettingsScreen}
      options={{headerShown: false}}
    />
  </Stack.Navigator>
);
