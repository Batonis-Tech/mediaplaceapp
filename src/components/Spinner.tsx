import React, {FunctionComponent} from 'react';
import {ActivityIndicator, StyleProp, View, ViewStyle} from 'react-native';

// styles
import {Color, styles} from '../styles';

interface Props {
  color?: string;
  style?: StyleProp<ViewStyle>;
}

export const Spinner: FunctionComponent<Props> = props => {
  const {root} = styles;

  return (
    <View style={[root, props.style]}>
      <ActivityIndicator
        style={{flex: 1}}
        size="large"
        color={props.color || Color.secondary_400}
      />
    </View>
  );
};
