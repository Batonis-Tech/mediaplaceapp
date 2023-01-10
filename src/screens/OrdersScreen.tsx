import React, {Dispatch, FunctionComponent, useState} from 'react';
import {View} from 'react-native';

// styles
import {styles} from '../styles';

// components
import {OrdersCard} from '../components';

//
import {SearchBar, Text} from 'react-native-elements';

interface Props {}

const OrdersScreen: FunctionComponent<Props> = props => {
  const [search, setSearch] = useState<string>('');

  const {root} = styles;

  return (
    <View style={root}>
      {/* <SearchBar
        placeholder="Type Here..."
        onChangeText={(text: string) => setSearch(text)}
        value={search}
        lightTheme={true}
      /> */}
      <OrdersCard
        status="200"
        onPress={() => {
          props.navigation.navigate('OrderDetailsScreen');
        }}
      />
    </View>
  );
};

export {OrdersScreen};
