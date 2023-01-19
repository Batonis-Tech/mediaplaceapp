import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

// styles
import {styles, Color} from '../../styles';

// screens
import {
  OrdersScreen,
  OrderDetailsScreen,
  StreamChatScreen,
} from '../../screens';

// icons
import {Icon} from '../../utils/Icon';
import {Research} from '../../assets/IconSvg';

const Stack = createStackNavigator();

export const OrdersNav = () => (
  <Stack.Navigator
    initialRouteName="OrdersScreen"
    screenOptions={{
      headerTitleStyle: styles.text_H4,
      headerStyle: {backgroundColor: Color.bgFone},
    }}>
    <Stack.Screen
      name="OrdersScreen"
      component={OrdersScreen}
      options={{
        title: 'Список заказов',
        headerRight: () => {
          return <Icon iconName={Research} />;
        },
      }}
    />
    <Stack.Screen
      name="OrderDetailsScreen"
      component={OrderDetailsScreen}
      options={{title: 'Детали заказа'}}
    />
    <Stack.Screen
      name="StreamChatScreen"
      component={StreamChatScreen}
      options={{headerStyle: {backgroundColor: Color.white}}}
    />
  </Stack.Navigator>
);
