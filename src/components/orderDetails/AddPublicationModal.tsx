import React, {FunctionComponent, useMemo, useState} from 'react';
import {StyleProp, View, ViewStyle} from 'react-native';

// styles
import {Color, styles} from '../../styles';

// components
import {HeaderModal, InputForm, MainButton} from '../';

// other deps
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  useBottomSheetDynamicSnapPoints,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import {useActions} from '../../hooks/useAction';
import {AppState} from '../../models';
import {useTypedSelector} from '../../hooks/useTypeSelector';
import {ApiService} from '../../services';

interface Props {
  bottomSheetModalRef: any;
  close: () => void;
  refresh?: () => void;
  style?: StyleProp<ViewStyle>;
}

export const AddPublicationModal: FunctionComponent<Props> = props => {
  const [url, setUrl] = useState<string>('');

  const snapPoints = useMemo(() => ['CONTENT_HEIGHT'], []);
  const {
    animatedHandleHeight,
    animatedSnapPoints,
    animatedContentHeight,
    handleContentLayout,
  } = useBottomSheetDynamicSnapPoints(snapPoints);

  const {screen, topDefault, bottomDefault} = styles;

  const {loadingAction} = useActions();
  const {orderDetails} = useTypedSelector((state: AppState) => state.user);

  const save = () => {
    loadingAction(true);
    props.close();

    ApiService.INSTANCE.patchUpdateOrder(orderDetails.id, {
      publication_url: url,
    })
      .then(resp => {
        console.log(resp);
      })
      .catch(error => console.log('pathUpdateOrder', error))
      .finally(() => {
        loadingAction(false);
        props.refresh();
      });
  };

  return (
    <BottomSheetModal
      ref={props.bottomSheetModalRef}
      snapPoints={animatedSnapPoints}
      handleIndicatorStyle={{height: 0}}
      handleHeight={animatedHandleHeight}
      contentHeight={animatedContentHeight}
      backdropComponent={props => (
        <BottomSheetBackdrop
          {...props}
          appearsOnIndex={0}
          disappearsOnIndex={-1}
        />
      )}>
      <BottomSheetView onLayout={handleContentLayout}>
        <HeaderModal title="Публикация" close={props.close} />

        <View style={screen}>
          <InputForm
            placeholder="Ссылка на публикацию"
            value={url}
            onChangeText={val => setUrl(val)}
            style={[
              {borderColor: Color.secondary_200, borderWidth: 1},
              topDefault,
            ]}
          />
          <View style={[topDefault, bottomDefault]}>
            <MainButton
              title="Сохранить"
              color={Color.primary_500}
              onPress={save}
            />
          </View>
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
};
