import React, {FunctionComponent} from 'react';
import {View, Text} from 'react-native';

// styles
import {styles, Color} from '../styles';

interface Props {}

export const ErrorScreen: FunctionComponent<Props> = props => {
  const {root, centerPosition} = styles;

  return (
    <View style={[root, centerPosition]}>
      <Text>Что-то пошло не так...</Text>
    </View>
  );
};
