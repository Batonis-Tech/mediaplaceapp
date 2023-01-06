import React from 'react';

// tabs
import {OrdersNav} from './mainNavigation/OrdersNav';
import {SettingsNav} from './mainNavigation/SettingsNav';

// styles
import {Color, Fonts} from '../styles';

// icons
import {Icon} from '../components/Icon';
import {Notes, Setting} from '../assets/IconSvg';

// nav
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

const activeColor = Color.primary_500;
const inactiveColor = Color.secondary_600;

const getIcon = (name: any, focused: boolean) => {
  return (
    <Icon
      iconName={name}
      size={24}
      fill={focused ? activeColor : inactiveColor}
    />
  );
};

export const MainNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="OrdersNav"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: activeColor,
        tabBarInactiveTintColor: inactiveColor,
        tabBarLabelStyle: {fontFamily: Fonts.regular},
        tabBarHideOnKeyboard: true,
      }}>
      <Tab.Screen
        name="OrdersNav"
        component={OrdersNav}
        options={{
          tabBarIcon: ({focused}) => getIcon(Notes, focused),
          tabBarLabel: 'Заказы',
        }}
      />

      <Tab.Screen
        name="SettingsNav"
        component={SettingsNav}
        options={{
          tabBarIcon: ({focused}) => getIcon(Setting, focused),
          tabBarLabel: 'Настройки',
        }}
      />
    </Tab.Navigator>
  );
};
