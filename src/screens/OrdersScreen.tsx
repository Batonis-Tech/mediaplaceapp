import React, {Dispatch, FunctionComponent} from 'react';
import {View} from 'react-native';

// components
import {OrdersCard} from '../components/orders/OrdersCard';

interface Props {
  dispatch: Dispatch<any>;
}

const OrdersScreen: FunctionComponent<Props> = ({dispatch}) => {
  return (
    <View style={{flex: 1, padding: 16}}>
      <OrdersCard status="200" />
    </View>
  );
};

export {OrdersScreen};
