import React, {FunctionComponent} from 'react';
import {Text, StyleProp, ViewStyle, TouchableOpacity, View} from 'react-native';

// styles
import {Color, styles} from '../styles';

// helpers
import {touchOpacity} from '../helpers';

// icons
import {Icon} from '../utils/Icon';
import {Close} from '../assets/IconSvg';

interface Props {
  title: string;
  close: () => void;
  style?: StyleProp<ViewStyle>;
}

export const HeaderModal: FunctionComponent<Props> = props => {
  const {betweenContainer, paddingHorizontalDefault, text_H4} = styles;

  return (
    <View style={[betweenContainer, paddingHorizontalDefault]}>
      <Text style={text_H4}>{props.title}</Text>

      <TouchableOpacity onPress={props.close} activeOpacity={touchOpacity}>
        <Icon iconName={Close} size={24} fill={Color.secondary_500} />
      </TouchableOpacity>
    </View>
  );
};
