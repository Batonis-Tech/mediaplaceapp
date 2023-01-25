import React, {FunctionComponent, useMemo} from 'react';
import {StyleProp, View, ViewStyle} from 'react-native';

// styles
import {styles} from '../../styles';
import {height} from '../../helpers';

// components
import {HeaderModal} from '../';

// other deps
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetScrollView,
  useBottomSheetDynamicSnapPoints,
  BottomSheetView,
  useBottomSheetSpringConfigs,
} from '@gorhom/bottom-sheet';
import RenderHtml from 'react-native-render-html';

interface Props {
  data: {data: {}; title: string};
  bottomSheetModalRef: any;
  close: () => void;
  style?: StyleProp<ViewStyle>;
}

export const TaskModal: FunctionComponent<Props> = props => {
  const initialPoints = useMemo(() => ['80%'], []);
  const snapPoints = useMemo(() => ['CONTENT_HEIGHT'], []);
  const {
    animatedHandleHeight,
    animatedSnapPoints,
    animatedContentHeight,
    handleContentLayout,
  } = useBottomSheetDynamicSnapPoints(snapPoints);

  const {root, paddingHorizontalDefault} = styles;

  const source = {
    html: props.data?.data,
  };

  return (
    <BottomSheetModal
      ref={props.bottomSheetModalRef}
      //snapPoints={animatedSnapPoints}
      //animationConfigs={animationConfigs}
      snapPoints={initialPoints}
      handleIndicatorStyle={{height: 0}}
      // handleHeight={animatedHandleHeight}
      // contentHeight={animatedContentHeight}
      backdropComponent={props => (
        <BottomSheetBackdrop
          {...props}
          appearsOnIndex={0}
          disappearsOnIndex={-1}
        />
      )}>
      {/* <View onLayout={handleContentLayout}> */}
      {/* <BottomSheetView onLayout={handleContentLayout}> */}
      {/* <View style={{minHeight: height * 0.1, maxHeight: height * 0.8}}> */}
      <HeaderModal title={props.data.title} close={props.close} />

      <BottomSheetScrollView
        style={paddingHorizontalDefault}
        showsVerticalScrollIndicator={false}>
        <RenderHtml source={source} contentWidth={200} />
      </BottomSheetScrollView>
      {/* </View> */}
      {/* </BottomSheetView> */}
      {/* </View> */}
    </BottomSheetModal>
  );
};
