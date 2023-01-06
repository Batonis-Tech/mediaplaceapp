import React, {Dispatch, FunctionComponent, useEffect, useState} from 'react';
import {Text, View} from 'react-native';

interface Props {
  dispatch: Dispatch<any>;
}

const OrdersScreen: FunctionComponent<Props> = ({dispatch}) => {
  return (
    <View style={{flex: 1}}>
      <Text>OrdersScreen</Text>
    </View>
  );
};

export {OrdersScreen};
