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

interface Props {}

const OrderDetailsScreen: FunctionComponent<Props> = props => {
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>('');

  const {openOrder} = useTypedSelector(state => state.user);
  const {getOrderDetails} = useActions();

  const {root} = styles;

  useEffect(() => {
    ApiService.INSTANCE.openOrder(props.route.params.orderId).then(resp => {
      getOrderDetails(resp);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <View style={root}>
      <OrderInfo orderInfo={openOrder} />

      <MainButton
        title="Отменить заказ"
        style={{marginTop: 16}}
        onPress={() => {}}
      />
    </View>
  );
};

export {OrderDetailsScreen};
