import React, {FunctionComponent} from 'react';
import {
  Text,
  StyleProp,
  ViewStyle,
  TouchableOpacity,
  Linking,
} from 'react-native';

// styles
import {Color, styles} from '../../styles';

// other deps
import {touchOpacity} from '../../helpers';

interface Props {
  link: any;
  style?: StyleProp<ViewStyle>;
}

export const LinkButton: FunctionComponent<Props> = props => {
  const {orderCard, betweenContainer, text_Subtitle1, text_Caption1} = styles;

  return (
    <TouchableOpacity
      style={[orderCard, betweenContainer, props.style]}
      activeOpacity={touchOpacity}
      onPress={() => Linking.openURL(props.link)}>
      <Text style={text_Subtitle1}>Публикация</Text>
      <Text style={[text_Caption1, {color: Color.secondary_400}]}>Перейти</Text>
    </TouchableOpacity>
  );
};
