import React, {FunctionComponent} from 'react';
import {Text, View, StyleProp, ViewStyle, TouchableOpacity} from 'react-native';

// styles
import {Color, styles} from '../styles';

// helpers
import {touchOpacity} from '../helpers';

interface Props {
  title: string;
  style?: StyleProp<ViewStyle>;
}

export const MainButton: FunctionComponent<Props> = props => {
  return (
    <TouchableOpacity
      style={[styles.settingCard, styles.centerPosition, props.style]}
      onPress={() => {}}
      activeOpacity={touchOpacity}>
      <Text style={[styles.text_Button, {color: Color.primary_500}]}>
        {props.title}
      </Text>
    </TouchableOpacity>
  );
};
