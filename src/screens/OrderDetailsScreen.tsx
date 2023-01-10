import React, {Dispatch, FunctionComponent, useState} from 'react';
import {View} from 'react-native';

// styles
import {styles} from '../styles';

// components
import {MainButton, OrderInfo} from '../components';

//
import {SearchBar} from 'react-native-elements';

interface Props {}

const OrderDetailsScreen: FunctionComponent<Props> = props => {
  const [search, setSearch] = useState<string>('');

  const {root} = styles;

  return (
    <View style={root}>
      <OrderInfo />

      <MainButton title="Отменить заказ" style={{marginTop: 16}} />
    </View>
  );
};

export {OrderDetailsScreen};
