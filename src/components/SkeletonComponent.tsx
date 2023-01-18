import React, {FunctionComponent} from 'react';
import {StyleProp, View, ViewStyle} from 'react-native';

// styles
import {Color, styles} from '../styles';
import {Skeleton} from '@rneui/themed';

interface Props {
  type?: string;
  style?: StyleProp<ViewStyle>;
}

export const SkeletonComponent: FunctionComponent<Props> = props => {
  const {screen} = styles;

  const data = (length: number, height: number) => {
    return new Array(length).fill({height});
  };

  const defaultData = [{height: 72}, {height: 76}, {height: 52}];

  const SkeletonItem = ({height}) => {
    return (
      <Skeleton
        height={height}
        skeletonStyle={[{backgroundColor: Color.white}]}
        animation="pulse"
        style={{borderRadius: 8}}
      />
    );
  };

  const Content = () => {
    switch (props.type) {
      case 'OrdersScreen': {
        return data(8, 90).map((item, index) => {
          return (
            <>
              <SkeletonItem height={item.height} />
              <View style={{height: 12}} />
            </>
          );
        });
      }
      case 'SettingsScreen': {
        return data(3, 60).map((item, index) => {
          return (
            <>
              <SkeletonItem height={item.height} />
              <View style={{height: 12}} />
            </>
          );
          // return defaultData.map((item, index) => {
          //   return (
          //     <>
          //       <SkeletonItem height={item.height} />
          //       <View style={{height: 16}} />
          //     </>
          //   );
        });
      }
    }
  };

  return (
    <View style={[screen, props.style]}>
      <Content />
    </View>
  );
};
