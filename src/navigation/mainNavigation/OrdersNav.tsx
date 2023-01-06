import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

// screens
import {OrdersScreen} from '../../screens';

const Stack = createStackNavigator();

const OrdersNav = () => (
  <Stack.Navigator initialRouteName="OrdersScreen">
    <Stack.Screen
      name="OrdersScreen"
      component={OrdersScreen}
      options={{title: 'Список заказов'}}
    />
  </Stack.Navigator>
);

export {OrdersNav};
