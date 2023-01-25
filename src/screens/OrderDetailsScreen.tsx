import React, {
  FunctionComponent,
  useState,
  useEffect,
  useRef,
  useCallback,
} from 'react';
import {Pressable, ScrollView, Text, View} from 'react-native';

// styles
import {Color, styles} from '../styles';

// components
import {MainButton, OrderInfo, Spinner, Task, TaskModal} from '../components';

// api
import {useTypedSelector} from '../hooks/useTypeSelector';
import {ApiService} from '../services';
import {useActions} from '../hooks/useAction';

// other deps
import {BottomSheetModal} from '@gorhom/bottom-sheet';

// icons
import {Chat} from '../assets/IconSvg';
import {Icon} from '../utils/Icon';

interface Props {
  route?: any;
  navigation?: any;
}

const OrderDetailsScreen: FunctionComponent<Props> = props => {
  const [loading, setLoading] = useState<boolean>(true);
  const [dataModal, setDataModal] = useState<{data: {}; title: string}>({
    data: {},
    title: '',
  });
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const {orderDetails, currentAccount, userData} = useTypedSelector(
    state => state.user,
  );
  const {getOrderDetails} = useActions();

  const {root, screen, bottomDefault, buttonOnKeyboard} = styles;

  const handlePresentModal = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleCloseModal = useCallback(() => {
    bottomSheetModalRef.current?.close();
  }, []);

  const getOrderInfo = () => {
    ApiService.INSTANCE.openOrder(props.route.params.order.id).then(resp => {
      getOrderDetails(resp);
      setLoading(false);
    });
  };

  useEffect(() => {
    getOrderInfo();
  }, []);

  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <Pressable
          onPress={() =>
            props.navigation.navigate('StreamChatScreen', {
              order: props.route.params.order,
            })
          }>
          <Icon iconName={Chat} />
        </Pressable>
      ),
    });
  }, [props.navigation]);

  const choise = () => {
    switch (orderDetails.status) {
      case 'Оплачено':
        return {
          general:
            currentAccount.role === 'user'
              ? 'Отменить заказ'
              : 'Отклонить заказ',
          generalAction: currentAccount.role === 'user' ? 'cancel' : 'reject',
          minor: currentAccount.role === 'user' ? '' : 'Взять в работу',
          minorAction: 'start',
        };
      case 'Ожидает согласования':
        return {
          minor: currentAccount.role === 'user' ? 'Принять текст' : '',
          minorAction: 'review',
        };
      case 'Ожидает публикации':
        return {};
      case 'Принят в работу':
        return {
          minor:
            currentAccount.role === 'user' ? '' : 'Отправить на согласование',
          minorAction: 'to_check',
        };
      case 'Опубликован':
        return {
          minor: currentAccount.role === 'user' ? 'Завершить заказ' : '',
          minorAction: 'close',
        };
      default:
        return {};
    }
  };

  const orderAction = (btn: string) => {
    const action = () =>
      btn === 'general' ? choise()?.generalAction : choise()?.minorAction;

    setLoading(true);
    ApiService.INSTANCE.getOrderAction(orderDetails.id, action())
      .then(() => getOrderInfo())
      .catch(error => console.log(error));
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <View style={root}>
      <ScrollView
        style={[screen, bottomDefault, root]}
        showsVerticalScrollIndicator={false}>
        <OrderInfo
          orderInfo={orderDetails}
          currentAccount={currentAccount}
          userData={userData}
        />

        {orderDetails.status === 'Ожидает публикации' &&
          currentAccount.role === 'platform' && <Text>публикация</Text>}

        {orderDetails?.quill_solution && (
          <Task
            title="Текст публикации"
            data={orderDetails?.quill_solution}
            style={{marginTop: 16}}
            onPress={() => {
              setDataModal(prevState => ({
                ...prevState,
                data: orderDetails?.quill_solution,
                title: 'Текст публикации',
              }));
              handlePresentModal();
            }}
          />
        )}

        {orderDetails?.quill_task && (
          <Task
            title="Задание"
            data={orderDetails?.quill_task}
            style={{marginTop: 16}}
            onPress={() => {
              setDataModal(prevState => ({
                ...prevState,
                data: orderDetails?.quill_task,
                title: 'Задание',
              }));
              handlePresentModal();
            }}
          />
        )}

        {!!choise()?.general && (
          <MainButton
            title={choise()?.general}
            style={{marginTop: 16}}
            onPress={() => orderAction('general')}
          />
        )}

        <TaskModal
          bottomSheetModalRef={bottomSheetModalRef}
          close={handleCloseModal}
          data={dataModal}
        />
      </ScrollView>

      {!!choise()?.minor && (
        <View style={buttonOnKeyboard}>
          <MainButton
            title={choise()?.minor}
            onPress={() => orderAction('minor')}
            color={Color.primary_500}
            focus={true}
          />
        </View>
      )}
    </View>
  );
};

export {OrderDetailsScreen};
