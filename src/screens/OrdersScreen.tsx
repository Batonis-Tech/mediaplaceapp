import React, {FunctionComponent, useEffect, useState} from 'react';
import {ScrollView} from 'react-native';

// styles
import {styles} from '../styles';

// components
import {OrdersCard, SkeletonComponent} from '../components';

//
import {SearchBar, Text} from 'react-native-elements';

// api
import {useActions} from '../hooks/useAction';
import {useTypedSelector} from '../hooks/useTypeSelector';
import {ApiService} from '../services';

interface Props {}

const OrdersScreen: FunctionComponent<Props> = props => {
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>('');

  const {root} = styles;

  const {access_token, orders, user} = useTypedSelector(state => state.user);
  const {getOrders} = useActions();

  useEffect(() => {
    ApiService.INSTANCE.getGetOrdersUser(access_token, user.id).then(resp => {
      getOrders(resp.results);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <SkeletonComponent type="OrdersScreen" />;
  }

  return (
    <ScrollView style={root} showsVerticalScrollIndicator={false}>
      {/* <SearchBar
        placeholder="Type Here..."
        onChangeText={(text: string) => setSearch(text)}
        value={search}
        lightTheme={true}
      /> */}

      {orders?.map((item: any, index: number) => {
        return (
          <OrdersCard
            key={index}
            order={item}
            onPress={() => {
              props.navigation.navigate('OrderDetailsScreen', {
                orderId: item.id,
              });
            }}
            style={{marginTop: 12}}
          />
        );
      })}
    </ScrollView>
  );
};

export {OrdersScreen};
