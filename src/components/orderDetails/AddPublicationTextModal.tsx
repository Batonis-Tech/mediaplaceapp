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
import {height} from '../../helpers';

interface Props {
  bottomSheetModalRef: any;
  close: () => void;
  refresh?: () => void;
  style?: StyleProp<ViewStyle>;
}

export const AddPublicationTextModal: FunctionComponent<Props> = props => {
  const [text, setText] = useState<string>('');

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
      quill_solution: `{"html":"<p>${text}</p>","delta":{"ops":[{"insert":"${text}\\n"}]}}`,
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
        <HeaderModal title="Текст публикации" close={props.close} />

        <View style={screen}>
          <InputForm
            placeholder="Текст публикации"
            value={text}
            onChangeText={val => setText(val)}
            multiline={true}
            style={[
              {borderColor: Color.secondary_200, height: height * 0.35},
              topDefault,
            ]}
            textStyle={{height: '100%', textAlignVertical: 'top'}}
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
