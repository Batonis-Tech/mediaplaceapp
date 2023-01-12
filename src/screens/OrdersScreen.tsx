import React, {FunctionComponent, useEffect, useState} from 'react';
import {ActivityIndicator} from 'react-native';

// styles
import {Color, styles} from '../styles';

// components
import {OrdersCard} from '../components';

//
import {SearchBar, Text} from 'react-native-elements';
import {useActions} from '../hooks/useAction';

import {useTypedSelector} from '../hooks/useTypeSelector';
import {ApiService} from '../services';
import {ReduxType} from '../models';
import {ScrollView} from 'react-native-gesture-handler';

interface Props {}

const OrdersScreen: FunctionComponent<Props> = props => {
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>('');

  const {root} = styles;

  const {access_token, orders} = useTypedSelector(state => state.user);
  const {getOrders} = useActions();

  useEffect(() => {
    ApiService.INSTANCE.getGetOrdersUser(access_token).then(resp => {
      getOrders(resp.results);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <ActivityIndicator
        style={{flex: 1}}
        size="large"
        color={Color.secondary_600}
      />
    );
  }

  return (
    <ScrollView style={root} showsVerticalScrollIndicator={false}>
      {/* <SearchBar
        placeholder="Type Here..."
        onChangeText={(text: string) => setSearch(text)}
        value={search}
        lightTheme={true}
      /> */}

      {orders?.map((item: {}, index: number) => {
        return (
          <OrdersCard
            key={index}
            order={item}
            onPress={() => {
              props.navigation.navigate('OrderDetailsScreen');
            }}
            style={{marginTop: 12}}
          />
        );
      })}
    </ScrollView>
  );
};

export {OrdersScreen};
