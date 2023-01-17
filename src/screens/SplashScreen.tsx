import React, {FunctionComponent, useEffect, useState} from 'react';
import {View, Text, ActivityIndicator} from 'react-native';

// styles
import {styles, Color} from '../styles';

import {ApiService, StorageService} from '../services';
import {useActions} from '../hooks/useAction';
import {ReduxType} from '../models';

interface Props {}

export const SplashScreen: FunctionComponent<Props> = props => {
  const [loading, setLoading] = useState<boolean>(false);
  const [art, setArt] = useState([]);

  const {root, centerPosition} = styles;

  const {navigateAction, saveUserInfo} = useActions();

  const tryToLogIn = () => {
    console.log('tryToLogIn');
    setLoading(true);

    StorageService.INSTANCE.getAuthToken().then(data => {
      console.log('AuthToken', data);
      if (data === null) {
        navigateAction(ReduxType.AUTH);
      } else {
        ApiService.INSTANCE.getUserInfo()
          .then(resp => {
            saveUserInfo(resp);
            navigateAction(ReduxType.MAIN);
          })
          .finally(() => setLoading(false));
      }
    });
    // .finally(() => setLoading(false));
  };

  useEffect(tryToLogIn, []);

  if (loading) {
    return (
      <ActivityIndicator
        style={{flex: 1}}
        size="large"
        color={Color.primary_500}
      />
    );
  }

  return (
    <View style={[root, centerPosition]}>
      <Text>Что-то пошло не так...</Text>
    </View>
  );
};
