import React from 'react';

// tabs
import {OrdersNav} from './mainNavigation/OrdersNav';
import {SettingsNav} from './mainNavigation/SettingsNav';

// nav
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

export const MainNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="OrdersNav"
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
      }}>
      <Tab.Screen name="OrdersNav" component={OrdersNav} />
      <Tab.Screen name="SettingsNav" component={SettingsNav} />
    </Tab.Navigator>
  );
};
