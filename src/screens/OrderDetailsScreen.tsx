import React, {FunctionComponent, useState, useEffect} from 'react';
import {View} from 'react-native';

// styles
import {styles} from '../styles';

// components
import {MainButton, OrderInfo, Spinner} from '../components';

//
import {SearchBar} from 'react-native-elements';
import {useTypedSelector} from '../hooks/useTypeSelector';
import {ApiService} from '../services';
import {useActions} from '../hooks/useAction';

interface Props {
  route?: any;
}

const OrderDetailsScreen: FunctionComponent<Props> = props => {
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>('');

  const {orderDetails} = useTypedSelector(state => state.user);
  const {getOrderDetails} = useActions();

  const {root} = styles;

  const getOrderInfo = () => {
    ApiService.INSTANCE.openOrder(props.route.params.orderId).then(resp => {
      getOrderDetails(resp);
      setLoading(false);
    });
  };

  useEffect(() => {
    getOrderInfo();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <View style={root}>
      <OrderInfo orderInfo={orderDetails} />

      <MainButton
        title="Отменить заказ"
        style={{marginTop: 16}}
        onPress={() => {}}
      />
    </View>
  );
};

export {OrderDetailsScreen};
