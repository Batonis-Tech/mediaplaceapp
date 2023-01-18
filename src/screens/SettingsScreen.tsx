import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import {View} from 'react-native';

// styles
import {styles} from '../styles';

// components
import {
  MainButton,
  NotificationCard,
  AccountCard,
  SkeletonComponent,
  ChangeProfileModal,
} from '../components';

// api
import {useTypedSelector} from '../hooks/useTypeSelector';
import {ApiService} from '../services';
import {useActions} from '../hooks/useAction';
import {ReduxType} from '../models';

// other deps
import {BottomSheetModal} from '@gorhom/bottom-sheet';

interface Props {}

const SettingsScreen: FunctionComponent<Props> = props => {
  const [activeSwitch, setActiveSwitch] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const {currentAccount, balance} = useTypedSelector(state => state.user);
  const {navigateAction, getBalance, errorResponse} = useActions();

  const {screen, topWithoutHeader} = styles;

  const currentResponse = () => {
    return currentAccount.role === 'user'
      ? ApiService.INSTANCE.getBillUser()
      : ApiService.INSTANCE.getBillProvider(currentAccount?.data?.id);
  };

  useEffect(() => {
    setLoading(true);

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

  const handleCloseModal = useCallback(() => {
    bottomSheetModalRef.current?.close();
  }, []);

  const exit = () => {
    ApiService.INSTANCE.logout().then(() => {
      navigateAction(ReduxType.AUTH);
    });
  };

  if (loading) {
    return <SkeletonComponent type="SettingsScreen" style={topWithoutHeader} />;
  }

  return (
    <View style={[screen, topWithoutHeader]}>
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

      <ChangeProfileModal
        bottomSheetModalRef={bottomSheetModalRef}
        close={handleCloseModal}
      />
    </View>
  );
};

export {SettingsScreen};
