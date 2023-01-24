import React, {FunctionComponent, useMemo} from 'react';
import {StyleProp, ViewStyle} from 'react-native';

// styles
import {styles} from '../../styles';

// components
import {HeaderModal} from '../';

// other deps
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import RenderHtml from 'react-native-render-html';

interface Props {
  data: {data: {}; title: string};
  bottomSheetModalRef: any;
  close: () => void;
  style?: StyleProp<ViewStyle>;
}

export const TaskModal: FunctionComponent<Props> = props => {
  const snapPoints = useMemo(() => ['80%'], []);

  const {root, paddingDefault} = styles;

  const source = {
    html: props.data?.data,
  };

  return (
    <BottomSheetModal
      ref={props.bottomSheetModalRef}
      index={0}
      snapPoints={snapPoints}
      handleIndicatorStyle={{height: 0}}
      backdropComponent={props => (
        <BottomSheetBackdrop
          {...props}
          appearsOnIndex={0}
          disappearsOnIndex={-1}
        />
      )}>
      <HeaderModal title={props.data.title} close={props.close} />

      <BottomSheetScrollView
        style={paddingDefault}
        showsVerticalScrollIndicator={false}>
        <RenderHtml source={source} contentWidth={200} />
      </BottomSheetScrollView>
    </BottomSheetModal>
  );
};
