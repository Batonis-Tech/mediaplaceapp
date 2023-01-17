import React, {FunctionComponent, useEffect, useState} from 'react';
import {View} from 'react-native';

// styles
import {styles} from '../styles';

// components
import {
  MainButton,
  NotificationCard,
  AccountCard,
  SkeletonComponent,
} from '../components';

// api
import {useTypedSelector} from '../hooks/useTypeSelector';
import {ApiService} from '../services';
import {useActions} from '../hooks/useAction';
import {ReduxType} from '../models';

interface Props {}

const SettingsScreen: FunctionComponent<Props> = props => {
  const [activeSwitch, setActiveSwitch] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  const {orders, user} = useTypedSelector(state => state.user);
  const {navigateAction} = useActions();

  const {root, paddingTopWithoutHeader} = styles;

  useEffect(() => {}, []);

  const exit = () => {
    ApiService.INSTANCE.logout().then(() => {
      navigateAction(ReduxType.AUTH);
    });
  };

  if (loading) {
    return (
      <SkeletonComponent
        type="SettingsScreen"
        style={paddingTopWithoutHeader}
      />
    );
  }

  return (
    <View style={[root, paddingTopWithoutHeader]}>
      <AccountCard data={user} />

      <NotificationCard
        active={activeSwitch}
        style={{marginTop: 16}}
        onValueChange={() => setActiveSwitch(!activeSwitch)}
      />

      <MainButton
        title="Выйти из аккаунта"
        style={{marginTop: 16}}
        onPress={exit}
      />
    </View>
  );
};

export {SettingsScreen};
