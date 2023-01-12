import React, {FunctionComponent, useEffect, useState} from 'react';
import {View, Text, ActivityIndicator} from 'react-native';

// styles
import {styles, Color} from '../styles';

interface Props {}

export const SplashScreen: FunctionComponent<Props> = props => {
  const [loading, setLoading] = useState<boolean>(true);

  const {root, centerPosition} = styles;

  const tryToLogIn = () => {};

  useEffect(tryToLogIn, []);

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
    <View style={[root, centerPosition]}>
      <Text>Что-то пошло не так...</Text>
    </View>
  );
};
