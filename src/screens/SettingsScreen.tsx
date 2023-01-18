import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import {View, Text} from 'react-native';

// styles
import {styles} from '../styles';

// components
import {
  MainButton,
  NotificationCard,
  AccountCard,
  SkeletonComponent,
  ChangeProfile,
} from '../components';

// api
import {useTypedSelector} from '../hooks/useTypeSelector';
import {ApiService} from '../services';
import {useActions} from '../hooks/useAction';
import {ReduxType} from '../models';
import {BottomSheetModal} from '@gorhom/bottom-sheet';

interface Props {}

const SettingsScreen: FunctionComponent<Props> = props => {
  const [activeSwitch, setActiveSwitch] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const {currentAccount, balance} = useTypedSelector(state => state.user);
  const {navigateAction, getBalance, errorResponse} = useActions();

  const {root, paddingTopWithoutHeader} = styles;

  const currentResponse = () => {
    return currentAccount.role === 'user'
      ? ApiService.INSTANCE.getBillUser()
      : ApiService.INSTANCE.getBillProvider(currentAccount?.data?.id);
  };

  useEffect(() => {
    setLoading(true);
    console.log('role', currentAccount.role);
    console.log('currentAccount', currentAccount?.data?.id);

    currentResponse()
      .then(resp => getBalance(resp))
      .catch(error => {
        console.log('getBill error', error);
        errorResponse();
      })
      .finally(() => setLoading(false));
  }, [currentAccount?.data?.id]);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

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
      <AccountCard
        data={currentAccount.data}
        balance={balance}
        onPress={() => handlePresentModalPress()}
      />

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

      <ChangeProfile bottomSheetModalRef={bottomSheetModalRef} />
    </View>
  );
};

export {SettingsScreen};
