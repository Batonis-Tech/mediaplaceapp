import React, {FunctionComponent, useEffect, useState} from 'react';
import {ScrollView, View} from 'react-native';

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
import {AppState} from '../models';

interface Props {}

const OrdersScreen: FunctionComponent<Props> = props => {
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>('');

  const {root} = styles;

  const {orders, user} = useTypedSelector((state: AppState) => state.user);
  const {getOrders, errorResponse} = useActions();

  useEffect(() => {
    setLoading(true);

    ApiService.INSTANCE.getGetOrdersUser(user.id)
      .then(resp => {
        getOrders(resp.results);
      })
      .catch(error => {
        console.log('error', error);
        errorResponse();
      })
      .finally(() => setLoading(false));
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
          <View key={index}>
            <OrdersCard
              order={item}
              onPress={() => {
                props.navigation.navigate('OrderDetailsScreen', {
                  orderId: item.id,
                });
              }}
              style={{marginTop: 12}}
            />
          </View>
        );
      })}
    </ScrollView>
  );
};

export {OrdersScreen};
