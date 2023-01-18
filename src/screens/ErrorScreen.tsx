import React, {FunctionComponent} from 'react';
import {View, Text} from 'react-native';

// styles
import {styles} from '../styles';

interface Props {}

export const ErrorScreen: FunctionComponent<Props> = () => {
  const {screen, centerPosition} = styles;

  return (
    <View style={[screen, centerPosition]}>
      <Text>Что-то пошло не так...</Text>
    </View>
  );
};
