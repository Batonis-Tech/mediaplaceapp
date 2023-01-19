import React from 'react';

// tabs
import {OrdersNav, SettingsNav} from './mainNavigation';

// styles
import {Color, Fonts} from '../styles';

// icons
import {Icon} from '../utils/Icon';
import {Notes, Setting} from '../assets/IconSvg';

// nav
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';

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
        options={({route}) => ({
          tabBarIcon: ({focused}) => getIcon(Notes, focused),
          tabBarLabel: 'Заказы',
          tabBarStyle: (route => {
            const routeName = getFocusedRouteNameFromRoute(route) ?? '';
            if (
              routeName === 'OrderDetailsScreen' ||
              routeName === 'StreamChatScreen'
            ) {
              return {display: 'none'};
            }
            return;
          })(route),
        })}
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
