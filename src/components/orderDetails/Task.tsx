import React, {FunctionComponent} from 'react';
import {Text, View, StyleProp, ViewStyle, TouchableOpacity} from 'react-native';

// styles
import {styles} from '../../styles';

// icons
import {Icon} from '../../utils/Icon';
import {RightArrow} from '../../assets/IconSvg';

// other deps
import {touchOpacity} from '../../helpers';
import {WebView} from 'react-native-webview';

interface Props {
  title: string;
  data: any;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}

export const Task: FunctionComponent<Props> = props => {
  const {orderCard, betweenContainer, text_Subtitle1} = styles;

  const source = {
    html: props.data,
  };

  return (
    <TouchableOpacity
      style={[orderCard, props.style, {height: 140}]}
      activeOpacity={touchOpacity}
      onPress={props.onPress}>
      <View style={betweenContainer}>
        <Text style={text_Subtitle1}>{props.title}</Text>
        <Icon iconName={RightArrow} />
      </View>

      <WebView source={source} style={{height: '100%'}} />
    </TouchableOpacity>
  );
};
