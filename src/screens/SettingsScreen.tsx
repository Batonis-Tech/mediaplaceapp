import React, {Dispatch, FunctionComponent, useEffect, useState} from 'react';
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
import {useTypedSelector} from '../hooks/useTypeSelector';
import {ApiService} from '../services';

interface Props {
  dispatch: Dispatch<any>;
}

const SettingsScreen: FunctionComponent<Props> = ({dispatch}) => {
  const [activeSwitch, setActiveSwitch] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  const {access_token, orders, user} = useTypedSelector(state => state.user);

  const {root, paddingTopWithoutHeader} = styles;

  useEffect(() => {
    ApiService.INSTANCE.getGetOrdersUser(access_token).then(resp => {
      //  getOrders(resp.results);
      // setLoading(false);
    });
  }, []);

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
        onPress={() => {}}
      />
    </View>
  );
};

export {SettingsScreen};
