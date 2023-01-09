import React, {Dispatch, FunctionComponent, useState} from 'react';
import {StatusBar, View} from 'react-native';

// components
import {MainButton, NotificationCard, AccountCard} from '../components';

interface Props {
  dispatch: Dispatch<any>;
}

const SettingsScreen: FunctionComponent<Props> = ({dispatch}) => {
  const [activeSwitch, setActiveSwitch] = useState<boolean>(false);

  return (
    <View
      style={{
        flex: 1,
        paddingTop: StatusBar.currentHeight + 16,
        paddingHorizontal: 16,
      }}>
      <AccountCard />

      <NotificationCard
        active={activeSwitch}
        style={{marginTop: 16}}
        onValueChange={() => setActiveSwitch(!activeSwitch)}
      />

      <MainButton title="Выйти из аккаунта" style={{marginTop: 16}} />
    </View>
  );
};

export {SettingsScreen};
