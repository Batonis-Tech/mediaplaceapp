import React, {FunctionComponent, useEffect, useState} from 'react';
import {FlatList, View, Text} from 'react-native';

// styles
import {styles} from '../styles';

// components
import {OrdersCard, SkeletonComponent} from '../components';

//
import {SearchBar} from 'react-native-elements';
// import {Searchbar} from 'react-native-paper';

// api
import {useActions} from '../hooks/useAction';
import {useTypedSelector} from '../hooks/useTypeSelector';
import {ApiService} from '../services';
import {AppState} from '../models';

// icons
import {Icon} from '../utils/Icon';
import {Close} from '../assets/IconSvg';

interface Props {
  navigation?: any;
}

const OrdersScreen: FunctionComponent<Props> = props => {
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>('');

  const [searchQuery, setSearchQuery] = React.useState('');

  const {screen, centerPosition, text_Caption1} = styles;

  const {orders, currentAccount} = useTypedSelector(
    (state: AppState) => state.user,
  );
  const {getOrders, errorResponse} = useActions();

  const onChangeSearch = query => {
    console.log(query);

    // console.log(orders);

    const newItem = orders.filter(newVal => {
      console.log(newVal);

      return Number(newVal.id) === Number(query);
    });
    console.log(newItem);

    setSearchQuery(query);
    //  getOrders(newItem);
  };

  const currentResponse = () => {
    return currentAccount.role === 'user'
      ? ApiService.INSTANCE.getOrdersUser(currentAccount.data?.id)
      : ApiService.INSTANCE.getOrdersProvider(currentAccount.data?.id);
  };

  const getData = () => {
    setLoading(true);

    currentResponse()
      .then(resp => getOrders(resp.results))
      .catch(error => {
        console.log('getOrders error', error);
        errorResponse();
      })
      .finally(() => {
        console.log(orders);
        setLoading(false);
      });
  };

  useEffect(() => getData(), [currentAccount.data?.id, props.navigation]);

  useEffect(() => {
    //props.navigation.setOptions({title: title});
    // props.navigation.setOptions({
    //   // headerRight: () => (
    //   // <SearchBar
    //   //   placeholder="Type Here..."
    //   //   onChangeText={onChangeSearch}
    //   //   value={searchQuery}
    //   //   platform="android"
    //   //   // cancelIcon={() => <Text>cansel</Text>}
    //   // />
    //   // ),
    //   //   headerRight: () => <View style={{backgroundColor: 'red', width: 100}} />,
    // });
  }, [props.navigation]);

  if (loading) {
    return <SkeletonComponent type="OrdersScreen" />;
  }

  return orders?.length !== 0 ? (
    <>
      {/* <SearchBar
        placeholder="Type Here..."
        onChangeText={(text: string) => onChangeSearch(text)}
        value={searchQuery}
        platform="android"
        //  cancelIcon={() => <Icon iconName={Close} />}
        searchIcon={() => <Icon iconName={Close} />}
      /> */}

      <FlatList
        data={orders}
        renderItem={({item}) => {
          return (
            <OrdersCard
              order={item}
              role={currentAccount.role}
              onPress={() => {
                props.navigation.navigate('OrderDetailsScreen', {
                  order: item,
                });
              }}
              style={{marginBottom: 12}}
            />
          );
        }}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        style={screen}
        refreshing={loading}
        onRefresh={() => getData()}
      />
    </>
  ) : (
    <View style={[screen, centerPosition]}>
      <Text style={text_Caption1}>Нет заказов</Text>
    </View>
  );
};

export {OrdersScreen};
