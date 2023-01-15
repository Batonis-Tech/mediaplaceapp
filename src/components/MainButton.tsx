import React, {FunctionComponent} from 'react';
import {Text, StyleProp, ViewStyle, TouchableOpacity} from 'react-native';

// styles
import {Color, styles} from '../styles';

// helpers
import {touchOpacity} from '../helpers';

interface Props {
  title: string;
  style?: StyleProp<ViewStyle>;
  color?: string;
  focus?: boolean;
  onPress: () => void;
}

export const MainButton: FunctionComponent<Props> = props => {
  const {settingCard, centerPosition, text_Button} = styles;

  return (
    <TouchableOpacity
      style={[
        settingCard,
        centerPosition,
        props.style,
        {
          backgroundColor: props.color || Color.white,
          borderRadius: props.focus ? 0 : 8,
        },
      ]}
      onPress={props.onPress}
      activeOpacity={touchOpacity}>
      <Text
        style={[
          text_Button,
          {color: props.color ? Color.white : Color.primary_500},
        ]}>
        {props.title}
      </Text>
    </TouchableOpacity>
  );
};
