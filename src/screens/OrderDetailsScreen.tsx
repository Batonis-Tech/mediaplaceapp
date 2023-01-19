import React, {
  FunctionComponent,
  useState,
  useEffect,
  useRef,
  useCallback,
} from 'react';
import {Pressable, ScrollView} from 'react-native';

// styles
import {styles} from '../styles';

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

  const {orderDetails} = useTypedSelector(state => state.user);
  const {getOrderDetails} = useActions();

  const {screen, bottomDefault} = styles;

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

  if (loading) {
    return <Spinner />;
  }

  return (
    <ScrollView
      style={[screen, bottomDefault]}
      showsVerticalScrollIndicator={false}>
      <OrderInfo orderInfo={orderDetails} />

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

      <MainButton
        title="Отменить заказ"
        style={{marginTop: 16}}
        onPress={() => {}}
      />

      <TaskModal
        bottomSheetModalRef={bottomSheetModalRef}
        close={handleCloseModal}
        data={dataModal}
      />
    </ScrollView>
  );
};

export {OrderDetailsScreen};
