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
import {
  MainButton,
  OrderInfo,
  Spinner,
  Task,
  TaskModal,
  AddButton,
  AddPublicationModal,
  AddPublicationTextModal,
  LinkButton,
} from '../components';

// api
import {useTypedSelector} from '../hooks/useTypeSelector';
import {ApiService} from '../services';
import {useActions} from '../hooks/useAction';

// other deps
import BottomSheet, {BottomSheetModal} from '@gorhom/bottom-sheet';

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

  // refs
  const taskModalRef = useRef<BottomSheetModal>(null);
  const addPublicationModalRef = useRef<BottomSheetModal>(null);
  const addPublicationTextModalRef = useRef<BottomSheetModal>(null);

  const {orderDetails, currentAccount, userData} = useTypedSelector(
    state => state.user,
  );
  const {getOrderDetails} = useActions();

  const {
    root,
    screen,
    bottomDefault,
    absoluteButton,
    topDefault,
    bottomDefaultWithScroll,
  } = styles;

  const currentResponse = (id: string, action: string) => {
    return currentAccount.role === 'user'
      ? ApiService.INSTANCE.getOrderActionUser(id, action)
      : ApiService.INSTANCE.getOrderActionProvider(id, action);
  };

  const getOrderInfo = () => {
    ApiService.INSTANCE.openOrder(props.route.params.order.id).then(resp => {
      getOrderDetails(resp);
      setLoading(false);
    });
  };

  useEffect(() => {
    getOrderInfo();
  }, [props.navigation]);

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
    currentResponse(orderDetails.id, action())
      .then(() => getOrderInfo())
      .catch(error => console.log(error));
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <View style={root}>
      <ScrollView style={[screen, root]} showsVerticalScrollIndicator={false}>
        <View style={bottomDefaultWithScroll}>
          <OrderInfo
            orderInfo={orderDetails}
            currentAccount={currentAccount}
            userData={userData}
          />

          {orderDetails.status === 'Ожидает публикации' &&
            currentAccount.role === 'platform' && (
              <AddButton
                title="Публикация"
                style={topDefault}
                onPress={() => addPublicationModalRef.current?.present()}
              />
            )}

          {orderDetails.status === 'Принят в работу' &&
            !orderDetails?.quill_solution &&
            currentAccount.role === 'platform' && (
              <AddButton
                title="Текст публикации"
                style={topDefault}
                onPress={() => addPublicationTextModalRef.current?.present()}
              />
            )}

          {orderDetails?.publication_url && (
            <LinkButton
              link={orderDetails?.publication_url}
              style={topDefault}
            />
          )}

          {orderDetails?.quill_solution && (
            <Task
              title="Текст публикации"
              data={orderDetails?.quill_solution}
              style={topDefault}
              onPress={() => {
                setDataModal(prevState => ({
                  ...prevState,
                  data: orderDetails?.quill_solution,
                  title: 'Текст публикации',
                }));
                taskModalRef.current?.present();
              }}
            />
          )}

          {orderDetails?.quill_task && (
            <Task
              title="Задание"
              data={orderDetails?.quill_task}
              style={topDefault}
              onPress={() => {
                setDataModal(prevState => ({
                  ...prevState,
                  data: orderDetails?.quill_task,
                  title: 'Задание',
                }));
                taskModalRef.current?.present();
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
        </View>
      </ScrollView>

      {!!choise()?.minor && (
        <View style={absoluteButton}>
          <MainButton
            title={choise()?.minor}
            onPress={() => orderAction('minor')}
            color={Color.primary_500}
          />
        </View>
      )}

      <TaskModal
        bottomSheetModalRef={taskModalRef}
        close={() => taskModalRef.current?.close()}
        data={dataModal}
      />

      <AddPublicationTextModal
        bottomSheetModalRef={addPublicationTextModalRef}
        close={() => addPublicationTextModalRef.current?.close()}
        refresh={() => getOrderInfo()}
      />

      <AddPublicationModal
        bottomSheetModalRef={addPublicationModalRef}
        close={() => addPublicationModalRef.current?.close()}
        refresh={() => getOrderInfo()}
      />
    </View>
  );
};

export {OrderDetailsScreen};
