import React, {FunctionComponent} from 'react';
import {Text, TouchableOpacity, View, StyleProp, ViewStyle} from 'react-native';

// styles
import {Color, styles} from '../../styles';

// icons
import {Icon} from '../../utils/Icon';
import {Notes, Account, Newspaper, DownArrow} from '../../assets/IconSvg';

// helpers
import {touchOpacity} from '../../helpers';

interface Props {
  data: any;
  balance: any;
  style?: StyleProp<ViewStyle>;
  onPress: () => void;
}

export const AccountCard: FunctionComponent<Props> = props => {
  const {
    settingCard,
    row_container,
    centerPosition,
    accountIcon,
    text_Subtitle1,
    text_Body2,
  } = styles;

  return (
    <View style={[settingCard, row_container]}>
      <View style={[centerPosition, accountIcon]}>
        <Icon iconName={Newspaper} size={20} fill={Color.secondary_900} />
      </View>

      <View>
        <TouchableOpacity
          style={row_container}
          activeOpacity={touchOpacity}
          onPress={() => props.onPress()}>
          <Text style={text_Subtitle1}>{props.data.name}</Text>
          <Icon iconName={DownArrow} size={20} fill={Color.secondary_900} />
        </TouchableOpacity>

        <Text style={[text_Body2, {color: Color.secondary_600}]}>
          На счете
          <Text style={{color: Color.secondary_900}}>
            {' '}
            {props.balance?.balance}
          </Text>
        </Text>
      </View>
    </View>
  );
};
