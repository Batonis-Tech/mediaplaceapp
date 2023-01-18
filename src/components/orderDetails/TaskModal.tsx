import React, {FunctionComponent, useMemo} from 'react';
import {StyleProp, ViewStyle, View} from 'react-native';

// styles
import {styles} from '../../styles';

// components
import {HeaderModal} from '../';

// other deps
import {BottomSheetBackdrop, BottomSheetModal} from '@gorhom/bottom-sheet';
import RenderHtml from 'react-native-render-html';

interface Props {
  data: {data: {}; title: string};
  bottomSheetModalRef: any;
  close: () => void;
  style?: StyleProp<ViewStyle>;
}

export const TaskModal: FunctionComponent<Props> = props => {
  const snapPoints = useMemo(() => ['40%'], []);

  const {paddingDefault} = styles;

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

      <View style={paddingDefault}>
        <RenderHtml source={source} />
      </View>
    </BottomSheetModal>
  );
};
