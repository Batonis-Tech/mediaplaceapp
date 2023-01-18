import React, {FunctionComponent} from 'react';
import {ActivityIndicator, StyleProp, View, ViewStyle} from 'react-native';

// styles
import {Color, styles} from '../styles';

interface Props {
  color?: string;
  style?: StyleProp<ViewStyle>;
}

export const Spinner: FunctionComponent<Props> = props => {
  const {screen, root} = styles;

  return (
    <View style={[screen, props.style]}>
      <ActivityIndicator
        style={root}
        size="large"
        color={props.color || Color.secondary_400}
      />
    </View>
  );
};
