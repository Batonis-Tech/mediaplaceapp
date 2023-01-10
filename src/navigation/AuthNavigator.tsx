import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

// styles
import {styles, Color} from '../styles';

// screens
import {AuthScreen} from '../screens';

const Stack = createStackNavigator();

const AuthNavigator = () => (
  <Stack.Navigator
    initialRouteName="AuthScreen"
    screenOptions={{headerShown: false}}>
    <Stack.Screen name="AuthScreen" component={AuthScreen} />
  </Stack.Navigator>
);

export {AuthNavigator};
