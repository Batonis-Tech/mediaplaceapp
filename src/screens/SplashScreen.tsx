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

  const {screen, root, centerPosition} = styles;

  const {navigateAction, saveUserInfo, saveProfileInfo} = useActions();

  const tryToLogIn = () => {
    console.log('tryToLogIn');
    setLoading(true);

    StorageService.INSTANCE.getAuthToken().then(data => {
      console.log('AuthToken', data);

      if (data === null) {
        navigateAction(ReduxType.AUTH);
      } else {
        StorageService.INSTANCE.getProfileInfo()
          .then(resp => {
            ApiService.INSTANCE.getUserInfo().then(resp => {
              saveUserInfo(resp);
            });

            saveProfileInfo({data: resp?.data, role: resp?.role});
            navigateAction(ReduxType.MAIN);
          })
          .finally(() => setLoading(false));
      }
    });
  };

  useEffect(tryToLogIn, []);

  if (loading) {
    return (
      <ActivityIndicator style={root} size="large" color={Color.primary_500} />
    );
  }

  return (
    <View style={[screen, centerPosition]}>
      <Text>Что-то пошло не так... </Text>
    </View>
  );
};
