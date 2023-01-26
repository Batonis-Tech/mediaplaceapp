import React, {FunctionComponent} from 'react';
import {Text, StyleProp, ViewStyle, TouchableOpacity} from 'react-native';

// styles
import {styles} from '../../styles';

// icons
import {Icon} from '../../utils/Icon';
import {Plus} from '../../assets/IconSvg';

// other deps
import {touchOpacity} from '../../helpers';

interface Props {
  title: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}

export const AddButton: FunctionComponent<Props> = props => {
  const {orderCard, betweenContainer, text_Subtitle1} = styles;

  return (
    <TouchableOpacity
      style={[orderCard, betweenContainer, props.style]}
      activeOpacity={touchOpacity}
      onPress={props.onPress}>
      <Text style={text_Subtitle1}>{props.title}</Text>
      <Icon iconName={Plus} />
    </TouchableOpacity>
  );
};
