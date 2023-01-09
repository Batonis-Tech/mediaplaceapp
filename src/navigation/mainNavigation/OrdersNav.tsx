import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

// styles
import {styles} from '../../styles';

// screens
import {OrdersScreen} from '../../screens';

const Stack = createStackNavigator();

export const OrdersNav = () => (
  <Stack.Navigator
    initialRouteName="OrdersScreen"
    screenOptions={{headerTitleStyle: styles.text_H4}}>
    <Stack.Screen
      name="OrdersScreen"
      component={OrdersScreen}
      options={{title: 'Список заказов'}}
    />
  </Stack.Navigator>
);
