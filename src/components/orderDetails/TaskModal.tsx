import React, {FunctionComponent, useMemo} from 'react';
import {StatusBar, StyleProp, View, ViewStyle} from 'react-native';

// styles
import {styles} from '../../styles';

// components
import {HeaderModal} from '../';

// other deps
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetScrollView,
  useBottomSheetDynamicSnapPoints,
} from '@gorhom/bottom-sheet';
import RenderHtml from 'react-native-render-html';
import {useAnimatedStyle} from 'react-native-reanimated';
import {height} from '../../helpers';

interface Props {
  data: {data: {}; title: string};
  bottomSheetModalRef: any;
  close: () => void;
  style?: StyleProp<ViewStyle>;
}

export const TaskModal: FunctionComponent<Props> = props => {
  const snapPoints = useMemo(() => ['CONTENT_HEIGHT'], []);
  const {
    animatedHandleHeight,
    animatedSnapPoints,
    animatedContentHeight,
    handleContentLayout,
  } = useBottomSheetDynamicSnapPoints(snapPoints);

  const {paddingHorizontalDefault} = styles;

  const source = {
    html: props?.data?.data,
  };

  const scrollViewAnimatedStyles = useAnimatedStyle(() => {
    const contentHeight = animatedContentHeight.value;
    const handleHeight = animatedHandleHeight.value;
    const bottomSheetHeight = handleHeight + contentHeight;

    return {
      height:
        bottomSheetHeight > height ? height - handleHeight : bottomSheetHeight,
    };
  });

  return (
    <BottomSheetModal
      ref={props.bottomSheetModalRef}
      snapPoints={animatedSnapPoints}
      handleIndicatorStyle={{height: 0}}
      handleHeight={animatedHandleHeight}
      contentHeight={animatedContentHeight}
      topInset={StatusBar.currentHeight}
      backdropComponent={props => (
        <BottomSheetBackdrop
          {...props}
          appearsOnIndex={0}
          disappearsOnIndex={-1}
        />
      )}>
      <HeaderModal title={props.data.title} close={props.close} />

      <BottomSheetScrollView
        style={[scrollViewAnimatedStyles, paddingHorizontalDefault]}
        showsVerticalScrollIndicator={false}>
        <View onLayout={handleContentLayout}>
          <RenderHtml source={source} />

          <View style={{height: 50}} />
        </View>
      </BottomSheetScrollView>
    </BottomSheetModal>
  );
};
